import ast
import torch
from pytorch_lightning.loggers.tensorboard import TensorBoardLogger
from pytorch_lightning import Trainer
from torchaudio.datasets import LIBRISPEECH
from torch.utils.data import DataLoader
from argparse import ArgumentParser
import model as m
from datasets import Data, collate_fn_padd

def get_trainer_details():
    help(Trainer)

def get_librispeech_data():
    ls_data = LIBRISPEECH(root='./datasets/LibriSpeech',download=True)
    return ls_data

def train(*args):

    h_params = m.Transcriber.h_params
    # h_params.update(args.hparams_override)
    # h_params = (0.1,1,512,50,20)

    model = m.ASRLightningModule()

    
    logger = TensorBoardLogger(save_dir='./tb_logs',name = 'ASR')
    trainer = Trainer(logger=logger)
    trainer = Trainer(accelerator='gpu', devices=1,
        max_epochs=10, num_nodes=1, gradient_clip_val=1.0
   )
    
    # data = get_librispeech_data()
    train_dataset = Data(json_path='./datasets/LibriSpeech/train', sample_rate = 8000, n_feats = 81, specaug_rate = 0.5, specaug_policy = 3,
    time_mask = 70, freq_mask = 15, valid=True )
    data_loader = DataLoader(
    train_dataset,
    batch_size=64,
    shuffle=True,
    num_workers=12)

    trainer.fit(model, data_loader)

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
    parser.add_argument('--train_file', default=None, required=False, type=str,
                        help='json file to load training data')
    parser.add_argument('--valid_file', default=None, required=False, type=str,
                        help='json file to load testing data')
    parser.add_argument('--valid_every', default=1000, required=False, type=int,
                        help='valid after every N iteration')

    # dir and path for models and logs
    parser.add_argument('--save_model_path', default='./models', required=True, type=str,
                        help='path to save model')
    parser.add_argument('--load_model_from', default=None, required=False, type=str,
                        help='path to load a pretrain model to continue training')
    parser.add_argument('--resume_from_checkpoint', default=None, required=False, type=str,
                        help='check path to resume from')
    parser.add_argument('--logdir', default='tb_logs', required=False, type=str,
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
    print(args._get_args)
    train(args)