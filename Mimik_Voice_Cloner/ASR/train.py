import ast
import torch
import pytorch_lightning as pl
from pytorch_lightning.loggers.tensorboard import TensorBoardLogger
from pytorch_lightning.callbacks import ModelCheckpoint
from torchaudio.datasets import LIBRISPEECH
from torch.utils.data import DataLoader
from torch.nn import functional as F
from argparse import ArgumentParser
import model as m
from datasets import Data, collate_fn_padd
# import tensorboardX
from typing import Any

data_paths = {
  'train_data_path': '/home/group6/Voice_Cloning/Mimik/Mimik_Voice_Cloner/ASR/datasets/LibriSpeech_WAVS/train_clean_100/train_tc100.json',
  'test_data_path': '/home/group6/Voice_Cloning/Mimik/Mimik_Voice_Cloner/ASR/datasets/LibriSpeech_WAVS/test_clean_100/test_tc100.json'
}

class ASRModule(pl.LightningModule):
    def __init__(self, model, args) -> None:
        super(ASRModule,self).__init__()
        self.model = model
        self.criterion = torch.nn.CTCLoss(zero_infinity=True)
        self.args = args

    def step(self, batch):
        # print('\n\nBATCH:',batch, '\n',len(batch),'\n\n')
        spectrograms, labels, input_lengths, label_lengths = batch
        bs = spectrograms.shape[0]
        hidden = self.model._init_hidden(bs)
        hn, c0 = hidden[0].to(self.device), hidden[1].to(self.device)
        output, _ = self.model.forward(spectrograms, (hn, c0))
        output = F.log_softmax(output, dim=2)
        loss = self.criterion(output, labels, input_lengths, label_lengths)
        return loss

    def training_step(self, batch, batch_idx):
        loss = self.step(batch)
        logs = {'loss': loss, 'lr': self.optimizer.param_groups[0]['lr']}
        return {'loss': loss, 'log': logs}

    def val_dataloader(self):
        d_params = Data.parameters
        d_params.update(self.args.dparams_override)
        test_dataset = Data(json_path=self.args.valid_file,
                            **d_params, valid=True)
        return DataLoader(dataset=test_dataset,
                            batch_size=self.args.batch_size,
                            num_workers=self.args.data_workers,
                            collate_fn=collate_fn_padd,
                            pin_memory=True)

    def checkpoint_callback(args):
      return ModelCheckpoint(
          filepath=args.save_model_path,
          save_top_k=True,
          verbose=True,
          monitor='val_loss',
          mode='min',
          prefix=''
      )
    
    def validation_step(self, batch, batch_idx):
        loss = self.step(batch)
        return {'val_loss': loss}

    
    def configure_optimizers(self):
        self.optimizer = torch.optim.AdamW(self.model.parameters(), 0.005)
        # self.scheduler = optim.lr_scheduler.ReduceLROnPlateau(self.optimizer, mode='min',factor=0.50, patience=6)
        # return [self.optimizer], [self.scheduler], ['val_loss']
        return self.optimizer


def get_trainer_details():
    help(pl.Trainer)

def get_librispeech_data():
    ls_data = LIBRISPEECH(root='./datasets/LibriSpeech',download=True)
    return ls_data

def train(args):

    h_params = m.Transcriber.hyper_parameters
    h_params.update(args.hparams_override)
    # h_params = (0.1,1,512,50,20)
    
    model = m.Transcriber(**h_params)
    
    if args.load_model_from:
        module = ASRModule.load_from_checkpoint(args.load_model_from, model=model, args=args)
    else:
        module = ASRModule(model, args)

    trainer_args = {
        'accelerator':'gpu',
        'devices':args.gpus,
        'max_epochs':args.epochs,
        'num_nodes':args.nodes,
        'gradient_clip_val':1.0,
        'check_val_every_n_epoch':args.valid_every, 
        'logger':TensorBoardLogger(save_dir=args.save_model_path, log_graph=True,),
        'callbacks':[pl.callbacks.EarlyStopping(
          monitor='val_loss',
          min_delta=0.001,
          patience=3,
          verbose=False,
          mode='min'
        )]
    }

    trainer_args['logger'].finalize('success')
    trainer = pl.Trainer(**trainer_args)
    
    # trainer = Trainer()
    
    # data = get_librispeech_data()
    # train_dataset = Data(json_path=data_paths['train_data_path'], sample_rate = 16000, n_feats = 81, specaug_rate = 0.5, specaug_policy = 3,
    # time_mask = 70, freq_mask = 15, valid=True )

    train_dataset = get_librispeech_data()
    data_loader = DataLoader(
    dataset=train_dataset,
    batch_size=args.batch_size,
    shuffle=True,
    num_workers=args.data_workers,
    collate_fn=collate_fn_padd,
    )

    trainer.fit(module, data_loader)

if __name__ == '__main__':
    parser = ArgumentParser()
    # distributed training setup
    parser.add_argument('-n', '--nodes', default=1, type=int, help='number of data loading workers')
    parser.add_argument('-g', '--gpus', default=1, type=int, help='number of gpus per node')
    parser.add_argument('-w', '--data_workers', default=0, type=int,
                        help='n data loading workers, default 0 = main process only')
    parser.add_argument('-db', '--dist_backend', default='ddp', type=str,
                        help='which distributed backend to use. defaul ddp')

    # train and valid
    parser.add_argument('--train_file', default=data_paths['train_data_path'], required=True, type=str,
                        help='json file to load training data')
    parser.add_argument('--valid_file', default=data_paths['test_data_path'], required=False, type=str,
                        help='json file to load testing data')
    parser.add_argument('--valid_every', default=1000, required=False, type=int,
                        help='valid after every N iteration')

    # dir and path for models and logs
    parser.add_argument('-smp','--save_model_path', default='/home/group6/Voice_Cloning/Mimik/Mimik_Voice_Cloner/ASR/models', required=False, type=str,
                        help='path to save model')
    parser.add_argument('--load_model_from', default=None, required=False, type=str,
                        help='path to load a pretrain model to continue training')
    parser.add_argument('--resume_from_checkpoint', default=None, required=False, type=str,
                        help='check path to resume from')
    parser.add_argument('--logdir', default='/home/group6/Voice_Cloning/Mimik/Mimik_Voice_Cloner/ASR/logs', required=False, type=str,
                        help='path to save logs')
    
    # general
    parser.add_argument('--epochs', default=10, type=int, help='number of total epochs to run')
    parser.add_argument('--batch_size', default=64, type=int, help='size of batch')
    parser.add_argument('--learning_rate', default=1e-3, type=float, help='learning rate')
    parser.add_argument('--pct_start', default=0.3, type=float, help='percentage of growth phase in one cycle')
    parser.add_argument('--div_factor', default=100, type=int, help='div factor for one cycle')
    parser.add_argument("--hparams_override", default="{}", type=str, required=False,
		help='override the hyper parameters, should be in form of dict. ie. {"attention_layers": 16 }')
    parser.add_argument("--dparams_override", default="{}", type=str, required=False,
		help='override the data parameters, should be in form of dict. ie. {"sample_rate": 8000 }')
    
    args = parser.parse_args()
    args.hparams_override = ast.literal_eval(args.hparams_override)
    args.dparams_override = ast.literal_eval(args.dparams_override)

    train(args)