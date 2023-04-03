import torch
import torch.nn as nn
from torch.nn import functional as F
from torch import optim
from torch.types import _TensorOrTensors as Tensor
from pytorch_lightning import LightningModule
from typing import Any


class CustomCNN(nn.Module):
    def __init__(self, dropout, n_features, same_shape = False) -> None:
        super(CustomCNN, self).__init__()
        self.dropout = nn.Dropout(dropout)
        self.norm = nn.LayerNorm(normalized_shape = n_features)
        self.same_shape = same_shape
        
    def forward(self, x):
        x = x.transpose(1,2)
        x=self.dropout(F.gelu(self.norm(x)))
        if self.same_shape:
            return x.transpose(1,2)
        return x

class Transcriber(nn.Module):
    hyper_parameters = {
        'dropout':0.1,
        'n_layers':1,
        'hidden_size':512,
        'n_features':81,
        'n_classes':20,
    }

    def __init__(self, dropout, n_layers, hidden_size, n_features, n_classes):
        super(Transcriber, self).__init__()
        self.dropout = dropout
        self.num_layers = n_layers
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
        # print('CHECK')
        x = x.transpose(1,2)
        x = self.dense(x) # batch, time, feature
        # print('CHECK')
        # x = x.transpose(1,2)
        x = x.transpose(0, 1) # time, batch, feature
        out, (hn, cn) = self.lstm(x, hidden)
        x = self.dropout(F.gelu(self.layer_norm2(out)))  # (time, batch, n_class)
        return self.final_fc(x), (hn, cn)

if __name__ == '__main__':

    ts = Transcriber(**Transcriber.h_params)
    print({ts})
