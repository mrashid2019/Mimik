const express = require("express")
const {spawn} = require("child_process");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server)
const PORT = 3001

io.on("connection", ()=>{
    console.log("Connected")
})

server.listen(PORT)


