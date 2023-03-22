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

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

const AUDIO_DIR = cwd()+'/uploads'
app.post('/transcribe', upload.single('audio'), async (req,res)=>{
//   console.log(req)
    const file = req.file

    console.log('Request received for the following file:',file)
    
    let pythonProcess = spawn('python3', ['src/modules/transcribe.py','--audio', AUDIO_DIR+'/'+file.filename])

    pythonProcess.stdout.on('data',(data)=>{
        console.log('data: ', `${data}`)
    })

    pythonProcess.stderr.on('data',(err)=>{
        console.error('err: ',`${err}`)
    })

    pythonProcess.stdout.on('close',()=>{
        console.log('Process complete. Sending File')
        // res.setHeader('Access-Control-Allow-Origin','*')
        res.sendFile('/home/durewil/Mimik/mimik_backend/output.wav')
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
