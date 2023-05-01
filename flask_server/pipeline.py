import whisper
from TTS.api import TTS
class Pipeline:
    def __init__(self, stt_model:whisper.Whisper, tts_model:TTS, config_path = None, vocoder_path = None) -> None:
        self.stt_model = stt_model
        self.tts_model = tts_model
        self.config_path = config_path
        self.vocoder_path = vocoder_path
        
    def clone_from_audio(self, original_wav, speaker_wav):
        extracted_text = self.stt_model.transcribe(original_wav)['text']
        self.tts_model.tts_to_file(text = extracted_text, speaker_wav = speaker_wav, language="en")
        
    def clone_text(self, text, speaker_wav):
        self.tts_model.tts_to_file(text = text, speaker_wav = speaker_wav, file_path='output.wav',language='en')