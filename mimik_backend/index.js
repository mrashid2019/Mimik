const express = require('express')
const bodyParser = require('body-parser');
const app = express();
const { spawn } = require('child_process');
app.use((req,res,next)=>{
  res.header('Access-Control-Allow-Origin','*')
  next()
})
app.use(bodyParser.json())
const http = require('http');
const server = http.createServer(app)
const io = require('socket.io')(server,{
  cors:{
    origin:"*",
    
  }
});

// const sttClient = require('stt-wasm');
// const { listModels } = require('@coqui-ai/tts');
// const { TTS } = require('@coqui-ai/tts-node');
// const { Readable } = require('stream');
// const Speaker = require('speaker');

// const stt = new sttClient({

// });

// const speaker = new Speaker({
//   sampleRate: 22050,
//   channels: 1,
// });

server.listen(8000, ()=>{console.log("Listening on 8000")});

app.get('/',(req,res)=>{
  res.send('Connected successfully!')
})

app.get('/transcribe',(req,res)=>{
  // res.set('Access-Control-Allow-Origin', 'http://localhost:3000');

  // const audio = req.files.input_file;
  console.log("REQUEST RECEIVED:", req.headers);

  const pythonProcess = spawn('python3', ['src/modules/transcribe.py']);
  pythonProcess.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  // res.setHeader('Access-Control-Allow-Origin', '*')
  res.send("Your message was received...")
})

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', ()=>{
    console.log("A user disconnected")
  })
  // Receive audio from the client
  // socket.on('audio', (data) => {
  //   const audioBuffer = Buffer.from(data, 'base64');
  //   console.log("AUDIO BUFFER:",{audioBuffer});
  // });
  //   // Perform speech-to-text
  //   stt.transcribe(audioBuffer)
  //     .then((result) => {
  //       const text = result.text;

  //       console.log('Transcribed text:', text);

  //       // Perform text-to-speech
  //       const defaultModel = listModels()[9]; //glowTTS model set as default
  //       console.log('default audio model:', defaultModel);
  //       const tts = new TTS(defaultModel);
  //       return tts.tts(text);
  //     })
  //     .then((audioBuffer) => {
  //       // Stream synthesized audio to the client
  //       const readable = new Readable({
  //         read() {
  //           this.push(audioBuffer);
  //           this.push(null);
  //         },
  //       });

  //       socket.emit('synthesized_audio', readable);
  //       console.log('Synthesized audio sent to client.');
  //     })
  //     .catch((error) => {
  //       console.error('Error transcribing audio:', error);
  //     });
  // });
});

