from model import Transcriber
from pytorch_lightning.loggers.tensorboard import TensorBoardLogger
from pytorch_lightning import Trainer
from argparse import ArgumentParser
def train(*args):
    h_params = Transcriber.h_params
    # h_params.update(args.h_params_override)

    model = Transcriber(**h_params)

    # logger = TensorBoardLogger(save_dir='./tb_logs',name = 'ASR')
    # trainer = Trainer(logger=logger)
    trainer = Trainer(
        max_epochs=10, accelerator=None, devices=0,
        num_nodes=1, gradient_clip_val=1.0,
        val_check_interval=1
   )
    trainer.fit(model)


train()