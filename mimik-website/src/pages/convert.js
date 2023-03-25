import React, {useState, useEffect, useRef} from 'react';
import io from "socket.io-client"
import Footer from '../components/Footer/index'
import axios from 'axios'


const socket = io('http://localhost:8000')
// socket.on
// const audio = new Audio()



const main = {
	height:'100%',
	width:'100%',
	display:'flex',
	flexDirection:'column',
	justifyContent:'space-between',
	alignItems:'center',
}

const waveformBar = {
	background: '#d1d1d1',
	width: '100%',
	height:'40px'
}
//ADD PLAY & UPLOAD BUTTONS 
	const Convert = () => {
		const [buttonName, setButtonName] = useState("Play")
		const [audio, setAudio] = useState(null);
		// const [socket, setSocket] = useState();
		const [audioUrl, setAudioUrl] = useState('');

	  
		useEffect(() => {
			// Set up WebSocket connection to server
			// const s = socketIOClient('http://localhost:3000');
			// setSocket(s);
			// return () => s.disconnect();
		}, []);

		useEffect(() => {
			if (audio) {
			  // Set up audio player
			  	// const audioEl = document.getElementById('audio');
			  	// audioEl.src = `data:audio/wav;base64,${audio}`;
				// // audioEl.src = audio;
				// console.log(audioEl.src)
			  	// audioEl.load();
			  	// audioEl.onended = () => setButtonName('Play');
			  	// setButtonName('Play');
			}
		}, [audio]);
	  
		const handleClick = () => {
			if (buttonName === 'Play') {
				// Send audio data to server over WebSocket connection
				socket.emit('audio', audio);
				setButtonName('Pause');
			  } else {
				// Pause audio player
				const audioEl = document.getElementById('audio');
				if (audioEl.paused) {
				  audioEl.play();
				  setButtonName('Pause');
				} else {
				  audioEl.pause();
				  setButtonName('Play');
				}
			}
		};
	  
		const addFile = (e) => {
		  if (e.target.files[0]) {
				const formData = new FormData();
				formData.append('audio', e.target.files[0]);
				
				// handleFetchAudio()

				axios.post('http://localhost:8000/transcribe', formData, {responseType:'blob'})
					.then((response) => {
						console.log(response)
						let data = response.data

						
						let audioBlob = new Blob([data], {type:'audio/wav'})
						let newaudioUrl = URL.createObjectURL(audioBlob)
						setAudio(newaudioUrl)
						console.log(audio)

					})
					.catch((error) => {
						console.log(error);
					});
			}
		};
	  
		return (
		  <div>
			<button onClick={handleClick}>{buttonName}</button>
			{audio && (
        		<audio id="audio" controls>
          		{/* <source src={`data:audio/wav;base64,${audio}`} type="audio/wav" /> */}
          		<source src={audio} type="audio/wav" />
       			
				</audio>
      		)}
			<input type="file" onChange={addFile} />
		  </div>
		);
	  };
	  
	  export default Convert;	
