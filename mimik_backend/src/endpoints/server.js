const http = require('http');
const { Server } = require('socket.io');
const sttClient = require('stt-wasm');
const { listModels } = require('@coqui-ai/tts');
const { TTS } = require('@coqui-ai/tts-node');
const { Readable } = require('stream');
const Speaker = require('speaker');

const io = new Server(http.createServer().listen(3000));

const stt = new sttClient({

});

const speaker = new Speaker({
  sampleRate: 22050,
  channels: 1,
});

io.on('connection', (socket) => {
  console.log('a user connected');

  // Receive audio from the client
  socket.on('audio', (data) => {
    const audioBuffer = Buffer.from(data, 'base64');

    // Perform speech-to-text
    stt.transcribe(audioBuffer)
      .then((result) => {
        const text = result.text;

        console.log('Transcribed text:', text);

        // Perform text-to-speech
        const defaultModel = listModels()[9]; //glowTTS model set as default
        console.log('default audio model:', defaultModel);
        const tts = new TTS(defaultModel);
        return tts.tts(text);
      })
      .then((audioBuffer) => {
        // Stream synthesized audio to the client
        const readable = new Readable({
          read() {
            this.push(audioBuffer);
            this.push(null);
          },
        });

        socket.emit('synthesized_audio', readable);
        console.log('Synthesized audio sent to client.');
      })
      .catch((error) => {
        console.error('Error transcribing audio:', error);
      });
  });
});

