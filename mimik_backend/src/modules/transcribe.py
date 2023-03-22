# import stt
# from stt import client
from TTS.api import TTS
from scipy.io.wavfile import write
import numpy as np
import whisper
from argparse import ArgumentParser
import uuid
import os

from TTS.tts.configs.glow_tts_config import GlowTTSConfig
from TTS.tts.models.glow_tts import GlowTTS

def main(audio):
    AUDIO_DIR = '/home/durewil/Mimik/mimik_backend/audio/'
    # output = client.main()
    print('AUDIO FILE:', audio)
    model = whisper.load_model("base")
    result = model.transcribe(args.audio)['text']
    
    # config = GlowTTSConfig()
    # model = GlowTTS.init_from_config(config, verbose=False)
    # model.
    # print(result['text'])
    default_model = TTS.list_models()[7] #glowTTS model set as default
    print('default audio model:',default_model)
    tts = TTS(default_model)
    # rand_filename = str(uuid.uuid4())
    tts.tts_to_file(result)
# file_path= AUDIO_DIR+rand_filename+'.wav'


    return 'COMPLETE!'

    # audio = np.array(audio)
    # write(AUDIO_DIR+'output.wav', 22500,audio)
    # # print('The output is:', output)

    # response = {'status': 'success'}
    # print(json.dumps(response))

if __name__ == '__main__':
    parser = ArgumentParser()
    parser.add_argument('--audio', type=str, help='The audio file to be processed', required=True)
    parser.add_argument('--test', type=bool, help='Run a test program')
    args = parser.parse_args()
    
    if args.test:
        print(os.getcwd())
    elif args.audio:
        main(args.audio)