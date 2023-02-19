from model import Transcriber
from pytorch_lightning.loggers.tensorboard import TensorBoardLogger
from pytorch_lightning import Trainer
#from torch.utils import tensorboard
from torchaudio.datasets import LIBRISPEECH
from torch.utils.data import DataLoader
from argparse import ArgumentParser

def get_trainer_details():
    help(Trainer)

def get_librispeech_data():
    ls_data = LIBRISPEECH(root='./datasets/LibriSpeech',download=True)
    return ls_data

def train(*args):
    h_params = Transcriber.h_params
    # h_params.update(args.h_params_override)

    model = Transcriber(**h_params)

    logger = TensorBoardLogger(save_dir='./tb_logs',name = 'ASR')
    trainer = Trainer(logger=logger)
    trainer = Trainer(
        max_epochs=10, accelerator=None, devices=0,
        num_nodes=1, gradient_clip_val=1.0,
        val_check_interval=1
   )
    
    data = get_librispeech_data()
    data_loader = DataLoader(
    ls_data,
    batch_size=1,
    shuffle=True,)

    trainer.fit(model, data_loader)


ls_data = get_librispeech_data()
print({ls_data})