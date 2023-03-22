const {spawn} = require("child_process");
// const bodyparser = require('')
const fs = require('fs')

const multer = require('multer')
const storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null, 'uploads/');
    },
    filename:(req,file,callback)=>{
        callback(null,file.originalname);
    }
});

if(!fs.existsSync('./uploads')){
    fs.mkdirSync('./uploads');
}

const express = require("express");
const { cwd, stdout, stderr } = require("process");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server,{cors:{origin:'*'}})
const upload = multer({storage})


const AUDIO_DIR = cwd()+'/uploads'
app.post('/transcribe', upload.single('audio'), async (req,res)=>{
//   console.log(req)
    const file = req.file
    
    let pythonProcess = spawn('python3', ['src/modules/transcribe.py','--audio', AUDIO_DIR+'/'+file.filename])

    pythonProcess.stdout.on('data',(data)=>{
        console.log('data: ', `${data}`)
    })

    pythonProcess.stderr.on('data',(err)=>{
        console.error('err: ',`${err}`)
    })

    pythonProcess.stdout.on('close',()=>{
        console.log('Process complete')
        res.setHeader('Access-Control-Allow-Origin','*')
        res.sendFile('/home/durewil/Mimik/mimik_backend/output.wav')
    })
    
   
})

io.on('connection', (socket) => {
  console.log('a user connected');

  // Receive audio from the client
  socket.on('audio', (data) => {
    const audioBuffer = Buffer.from(data, 'base64');
  });

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

server.listen(8000,()=>{
  console.log('Server listening on port 8000')
})
