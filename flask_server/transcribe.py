'''
Transcribe a wav file sent from client to server (this file is run as a child-process)
in Mimik's backend Express server
'''
from argparse import ArgumentParser
from TTS.api import TTS
# import TTS.utils.audio
import whisper


def main(**kwargs):
    '''
    Run transcription on the passed audio
    '''
    print('ARGS:', args)
    
    stt_model = whisper.load_model("base")
    result = stt_model.transcribe(kwargs.get('audio'))['text']
    model_name = TTS.list_models()[kwargs.get('model')] #default model is yourTTS
    print('default audio model:', model_name)
    # TTS.load_model_by_name(model_name)
    # TTS.
    tts_model = TTS(model_name=model_name)
    
    try:
        if kwargs.get('model') == 0:
            tts_model.tts_to_file(text=result, speaker=kwargs.get('speaker'), speaker_wav=kwargs.get(
                'ref_wav'), file_path=kwargs.get('out_file'), language='en')
        elif model == 7:
            tts_model.tts_to_file(text=result)
    except RuntimeError as runtime_err:
        print('Error:', runtime_err)
        

    print('File written to: ', kwargs.get('out_file'))

if __name__ == '__main__':
    parser = ArgumentParser()
    parser.add_argument('--audio', type=str,
                        help='The audio file to be processed', required=True)
    parser.add_argument('--out_file', type=str,
                        help='The output file path', default='output.wav')
    parser.add_argument('--test', type=bool, help='Run a test program')
    parser.add_argument('--model_num', type=int, default=0,
                        help='Choose which model to run (recommend 0 or 7)')
    parser.add_argument('--speaker', type=str,
                        help='Pass one of the default speakers', default=None)
    parser.add_argument('--ref_wav', type=str,
                        help='If using YourTTS, pass the reference wav file.', default=None)
    args = parser.parse_args()

    if args.test:
        default_model = TTS.list_models()[0]
        tts = TTS(default_model)
        print(tts.is_multi_speaker, tts.speakers)
    elif args.audio:
        main(audio=args.audio, out_file=args.out_file,
             model=args.model_num, ref_wav=args.ref_wav)
