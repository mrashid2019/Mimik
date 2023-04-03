# import stt
# from stt import client
from TTS.api import TTS
import whisper
from argparse import ArgumentParser


def main(audio):
    AUDIO_DIR = '/home/durewil/Mimik/mimik_backend/audio/'
    # output = client.main()
    print('AUDIO FILE:', audio)
    model = whisper.load_model("base")
    result = model.transcribe(args.audio)['text']
    
    model = TTS.list_models()[kwargs.get('model')] #glowTTS model set as default
    print('default audio model:',model)
    tts = TTS(model_name = model)
    # rand_filename = str(uuid.uuid4())
    if kwargs.get('model') == 0:
        tts.tts_to_file(text=result, speaker=kwargs.get('speaker'), speaker_wav= kwargs.get('ref_wav'), file_path=kwargs.get('out_file'), language='en')
    elif model == 7:
        tts.tts_to_file(text = result)
        
    print('File written to: ', kwargs.get('out_file'))


if __name__ == '__main__':
    parser = ArgumentParser()
    parser.add_argument('--audio', type=str, help='The audio file to be processed', required=True)
    parser.add_argument('--test', type=bool, help='Run a test program')
    parser.add_argument('--model_num', type=int, default=0, help='Choose which model to run (recommend 0 or 7)')
    parser.add_argument('--speaker', type=str, help='Pass one of the default speakers', default = None)
    parser.add_argument('--ref_wav', type=str, help='If using YourTTS, pass the reference wav file.', default = None)
    args = parser.parse_args()
    
    if args.test == True:
        default_model = TTS.list_models()[0]
        tts = TTS(default_model)
        print(tts.is_multi_speaker, tts.speakers)
    elif args.audio:
        main(args.audio)