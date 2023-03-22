import stt
from stt import client
from TTS.api import TTS
from scipy.io.wavfile import write
import numpy as np


AUDIO_DIR = '/home/group6/Voice_Cloning/Mimik/mimik_backend/src/audio/output'

output = client.main()
print('The output is:', output)

print('The output is:', output)

default_model = TTS.list_models()[9] #glowTTS model set as default
print('default audio model:',default_model)
tts = TTS(default_model)
audio = tts.tts_to_file(output, file_path=AUDIO_DIR+'/output.wav')

audio = np.array(audio)
write(AUDIO_DIR+'output.wav', 22500,audio)
# print('The output is:', output)

response = {'status': 'success'}
print(json.dumps(response))