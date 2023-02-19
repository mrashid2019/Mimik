import torch
import torch.nn as nn
from torch.nn import functional as F
from torch import optim
from torch.types import _TensorOrTensors as Tensor
from pytorch_lightning import LightningModule
from typing import Any
import argparse


class CustomCNN(LightningModule):
    def __init__(self, dropout, n_features, same_shape = False) -> None:
        super(CustomCNN, self).__init__()
        self.dropout = nn.Dropout(dropout)
        self.norm = nn.LayerNorm(normalized_shape = n_features)
        self.same_shape = same_shape
        
    def forward(self, X:Tensor):
        X = X.transpose(1,2)
        x=self.dropout(F.gelu(self.norm(x)))
        if self.same_shape:
            return X.transpose(1,2)
        return X

class Transcriber(nn.Module):
    h_params = {
        'dropout':0.1,
        'n_layers':1,
        'hidden_size':512,
        'n_features':50,
        'n_classes':20,
    }

    def __init__(self, dropout, n_layers, hidden_size, n_features, n_classes):
        super(Transcriber, self).__init__()
        self.dropout = dropout
        self.n_layers = n_layers
        self.hidden_size = hidden_size
        self.n_features = n_features
        self.n_classes = n_classes

        self.cnn = nn.Sequential(
            nn.Conv1d(n_features, n_features, 10, 2, padding=5),
            # CustomCNN(dropout=self.dropout, n_features=self.n_features)
        )

        self.dense = nn.Sequential(
            nn.Linear(n_features,128),
            nn.LayerNorm(128),
            nn.GELU(),
            nn.Dropout(dropout),
            nn.Linear(128,128),
            nn.LayerNorm(128),
            nn.GELU(),
            nn.Dropout(dropout)
        )

        self.lstm = nn.LSTM(input_size=128, hidden_size=hidden_size,
                            num_layers=n_layers, dropout=0.0,
                            bidirectional=False)

        self.layer_norm2 = nn.LayerNorm(hidden_size)
        self.dropout = nn.Dropout(dropout)
        self.final_fc = nn.Linear(hidden_size, n_classes)
        
        # for layer in self.layers:
        #     print(layer)


    def _init_hidden(self, batch_size):
        n, hs = self.num_layers, self.hidden_size
        return (torch.zeros(n*1, batch_size, hs),
            torch.zeros(n*1, batch_size, hs))

    def forward(self, x, hidden):
        x = x.squeeze(1)  # batch, feature, time
        x = self.cnn(x) # batch, time, feature
        x = self.dense(x) # batch, time, feature
        x = x.transpose(0, 1) # time, batch, feature
        out, (hn, cn) = self.lstm(x, hidden)
        x = self.dropout2(F.gelu(self.layer_norm2(out)))  # (time, batch, n_class)
        return self.final_fc(x), (hn, cn)


class ASRLightningModule(LightningModule):
    def __init__(self, *args: Any, **kwargs: Any) -> None:
        super().__init__(*args, **kwargs)
        self.model = Transcriber(0.1,1,512,50,20)
        self.loss_func = nn.CTCLoss(blank=28, zero_infinity=True)


    def step(self, batch):
        print('\n\nBATCH:',batch, '\n',len(batch),'\n\n')
        spectrograms, labels, input_lengths, label_lengths = batch 
        bs = spectrograms.shape[0]
        hidden = self.model._init_hidden(bs)
        hn, c0 = hidden[0].to(self.device), hidden[1].to(self.device)
        output, _ = self(spectrograms, (hn, c0))
        output = F.log_softmax(output, dim=2)
        loss = self.criterion(output, labels, input_lengths, label_lengths)
        return loss

    def training_step(self, batch, batch_idx):
        loss = self.step(batch)
        logs = {'loss': loss, 'lr': self.optimizer.param_groups[0]['lr'] }
        return {'loss': loss, 'log': logs}
    
    def configure_optimizers(self):
        self.optimizer = optim.AdamW(self.model.parameters(), 0.005)
        # self.scheduler = optim.lr_scheduler.ReduceLROnPlateau(self.optimizer, mode='min',factor=0.50, patience=6)
        # return [self.optimizer], [self.scheduler], ['val_loss']
        return self.optimizer

if __name__ == '__main__':

    ts = Transcriber(**Transcriber.h_params)
    print({ts})
