// add button element to HTML
<button id="start-recording">Start Recording</button>

// when user clicks the button, start recording their voice
document.getElementById('start-recording').addEventListener('click', function() {
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(function(stream) {
      // create PeerConnection with server
      var pc = new RTCPeerConnection();
      var socket = io.connect('http://localhost:8000');
      socket.on('connect', function() {
        // send offer to server
        pc.createOffer()
          .then(function(offer) {
            pc.setLocalDescription(offer);
            socket.emit('offer', offer);
          });
      });
      
      // create MediaRecorder and attach to stream
      var mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();
      
      // send recorded audio to server when recording is stopped
      mediaRecorder.addEventListener('stop', function() {
        var blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
        socket.emit('audio', blob);
      });
      
      // collect audio data in chunks
      var chunks = [];
      mediaRecorder.addEventListener('dataavailable', function(e) {
        chunks.push(e.data);
      });
      
      // stop recording after 10 seconds (or however long you want)
      setTimeout(function() {
        mediaRecorder.stop();
        pc.close();
      }, 10000);
    });
});
