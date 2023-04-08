from flask import Flask
from flask import request
import transcribe
from TTS.api import TTS
import whisper
from pipeline import Pipeline

stt_model = whisper.load_model("base")
model_name = TTS.list_models()[0] #default model is yourTTS
tts_model = TTS(model_name=model_name)
e2e_model = Pipeline(stt_model=stt_model, tts_model=tts_model)

app = Flask(__name__)

@app.route("/")
def hello_world():
    """base route for application

    Returns:
        html string
    """
    return "<p>Hello, world</p>"

@app.route("/transcribe")
def process_audio():
    e2e_model.transcribe_yourtts()
    # pass

if __name__ == '__main__':
    app.run(host='localhost', port=8000)