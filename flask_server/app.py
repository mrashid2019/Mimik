from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
from TTS.api import TTS
import whisper
from pipeline import Pipeline
from scipy.io import wavfile
import numpy as np

stt_model = whisper.load_model("base")
model_name = TTS.list_models()[0] #default model is yourTTS
tts_model = TTS(model_name=model_name)
e2e_model = Pipeline(stt_model=stt_model, tts_model=tts_model)

app = Flask(__name__)
CORS(app)

@app.route("/",)
def hello_world():
    """base route for application

    Returns:
        html string
    """
    return "<p>Hello, world</p>"

@app.route("/transcribe", methods=["POST"])
def process_audio():
    content, reference = request.files.get('content'), request.files.get('reference')
    # print(f"REQUEST FILES: {content}\n{reference}")
    content.save('content.wav') #add reading the audio file to utils.py
    ref = reference.save('refernce.wav')
    # _, content_data = wavfile.read(content)
    # _, reference_data = wavfile.read(reference)
    # content_data = content_data.astype(np.float32)
    # reference_data = reference_data.astype(np.float32)
    # content_data.tofile('content.wav')
    # reference_data.tofile('reference.wav')
    e2e_model.transcribe_yourtts(original_wav='content.wav',speaker_wav='reference.wav')
    
    # response = jsonify({'data':'Hello!'})
    # response.headers.add('Access-Control-Allow-Origin','*')
    return send_file('output.wav', as_attachment=True)

if __name__ == '__main__':
    print("RUNNING ON 8000")
    app.run(host='localhost', port=8000)