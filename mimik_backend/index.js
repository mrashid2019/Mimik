const {spawn} = require("child_process");
const fs = require('fs')
const path = require('path')
const os = require('os')

const multer = require('multer')
const storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null, 'src/audio/uploads/');
    },
    filename:(req,file,callback)=>{
        callback(null,file.originalname);
    }
});

if(!fs.existsSync('src/audio/uploads')){
    fs.mkdirSync('src/audio/uploads');
}
if(!fs.existsSync('src/audio/output')){
  fs.mkdirSync('src/audio/output');
}


const express = require("express");
// const { cwd, stdout, stderr } = require("process");
const { randomUUID } = require("crypto");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server,{cors:{origin:'*'}})
const upload = multer({storage})

const INPUT_AUDIO_DIR = path.join(path.dirname(__filename),'src/audio/uploads')
const OUTPUT_AUDIO_DIR = path.join(path.dirname(__filename),'src/audio/output')


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.post('/transcribe', upload.any('audio'), async (req,res)=>{
//   console.log(req)
    const files = req.files
    console.log('Request received for the following files:',files)
    let outFile = randomUUID()+'.wav'
    let outFilePath = path.join(OUTPUT_AUDIO_DIR, outFile)
    let pythonProcess = spawn('python3', ['src/modules/transcribe.py','--audio', path.join(INPUT_AUDIO_DIR,files[0].filename), 
    '--ref_wav',path.join(INPUT_AUDIO_DIR,files[1].filename),
    '--out_file', outFilePath
  ])

    pythonProcess.stdout.on('data',(data)=>{
        console.log('data: ', `${data}`)
    })

    pythonProcess.stderr.on('data',(err)=>{
        console.error('err: ',`${err}`)
    })

    pythonProcess.stdout.on('close',()=>{
        console.log('Process complete. Sending File')
        // res.setHeader('Access-Control-Allow-Origin','*')
        res.sendFile(outFilePath)
    })
    // res.sendFile('/home/durewil/Mimik/mimik_backend/output.wav')
   
})

io.on('connection', (socket) => {
  console.log('A user connected');
  // Receive audio from the client
  socket.on('audio', (data) => {
    // console.log('DATA',data)

    // const audioBuffer = Buffer.from(data, 'base64');
    socket.send('OKAY!')
  });

  socket.on('disconnect',()=>{
    console.log('A user disconnected')
  })

  
});

server.listen(8000,()=>{
  console.log('Server listening on port 8000')

})