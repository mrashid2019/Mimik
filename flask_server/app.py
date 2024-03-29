from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
from TTS.api import TTS
import whisper
from pipeline import Pipeline
from scipy.io import wavfile
import numpy as np
from uuid import uuid4
from random import randint
import os

stt_model = whisper.load_model("base")
model_name = TTS.list_models()[0] #default model is yourTTS
tts_model = TTS(model_name=model_name)
e2e_model = Pipeline(stt_model=stt_model, tts_model=tts_model)

app = Flask(__name__)
CORS(app)

def generate_random_wav_name():
    return str(uuid4())[randint(0,5):randint(6,15)]+'.wav'

def delete_file(filename):
    path = os.getcwd() + '/'+filename
    if os.path.exists(path):
        os.remove(path)
        print(f'Cleaned up file @ {path}')
    else:
        print(f'File {path} does not exist')

@app.route("/",)
def hello_world():
    """base route for application

    Returns:
        html string
    """
    return "<p>Hello, world</p>"

@app.route("/clone", methods=["POST"])
def process_audio():
    # content = None
    # request = None
    # text = None
    if(request.form.get('text')):
        text = request.form.get('text')
    else:
        content = request.files.get('content')
    
    reference = request.files.get('reference')
    ref_file_name = generate_random_wav_name()
    reference.save(ref_file_name)

    if(text):
        e2e_model.clone_text(text,ref_file_name)
    else:
        content_file_name = generate_random_wav_name()
        content.save(content_file_name) #add reading the audio file to utils.py
        e2e_model.clone_from_audio(original_wav=content_file_name,speaker_wav=ref_file_name)   
        delete_file(content_file_name)
    
    delete_file(ref_file_name)
    
    return send_file('output.wav', as_attachment=True)

@app.route("/clone_text", methods=["POST"])
def process_text():
        text = request.data.decode('utf-8')
        reference = request.files.get('reference')

        print(text)
        
        return {'message':'OK!'}
        # e2e_model.clone_text(text,speaker_wav='reference.wav')
        # return send_file('output.wav', as_attachment=True)


if __name__ == '__main__':
    print("RUNNING ON 8000")
    app.run(host='localhost', port=8000)