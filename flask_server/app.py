from flask import Flask, jsonify, request, send_file
from flask import request
import transcribe
from TTS.api import TTS
import whisper
from pipeline import Pipeline
from flask_cors import CORS

stt_model = whisper.load_model("base")
model_name = TTS.list_models()[0] #default model is yourTTS
tts_model = TTS(model_name=model_name)
e2e_model = Pipeline(stt_model=stt_model, tts_model=tts_model)

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello_world():
    """base route for application

    Returns:
        html string
    """
    return "<p>Hello, world</p>"

@app.route("/transcribe", methods=['POST'])
def process_audio():
    content = request.files.get('content')
    reference = request.files.get('reference')
    content.save('content.wav') #add reading the audio file to utils.py
    reference.save('reference.wav')

    e2e_model.transcribe_yourtts(original_wav='content.wav',speaker_wav='reference.wav')
    
   
    return send_file('output.wav', as_attachment=True)
if __name__ == '__main__':
    app.run(host='localhost', port=8000)