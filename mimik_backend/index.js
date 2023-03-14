// const express = require("express")
// const {spawn} = require("child_process");
// const app = express();
// const server = require("http").Server(app);
// const io = require("socket.io")(server)
// const PORT = 3001

// io.on("connection", ()=>{
//     console.log("Connected")
// })


// server.listen(PORT)

var app = require( 'express' )();
var http = require( 'http' ).createServer( app );
var io = require( 'socket.io' )( http, {
    cors:{origin:"*"}
} );

const PORT = 8000;

http.listen( PORT, function() {
console.log( 'listening on *:' + PORT );
});

io.on( 'connection', function( socket ) {
console.log( 'a user has connected!' );
});

