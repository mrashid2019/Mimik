import React, {useState, useEffect, useRef} from 'react';
import io from "socket.io-client"
import axios from "axios"

const socket = io('http://localhost:8000')


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
		const [audio, setAudio] = useState();
		const [socket, setSocket] = useState();
	  
		useEffect(() => {
			// Set up WebSocket connection to server
			const s = socketIOClient('http://localhost:3000');
			setSocket(s);
			return () => s.disconnect();
		}, []);

		useEffect(() => {
			if (audio) {
			  // Set up audio player
			  const audioEl = document.getElementById('audio');
			  audioEl.src = `data:audio/wav;base64,${audio}`;
			  audioEl.load();
			  audioEl.onended = () => setButtonName('Play');
			  setButtonName('Play');
			}
		}, [audio]);
	  
		const handleClick = () => {
			if (socket && buttonName === 'Play') {
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
				formData.append('input_file', e.target.files[0]);
				axios
					.post('http://localhost:3000/transcribe', formData, {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				})
				.then((response) => {
					setAudio(response.data.audio);
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
          		<source src={`data:audio/wav;base64,${audio}`} type="audio/wav" />
       			</audio>
      		)}
			<input type="file" onChange={addFile} />
		  </div>
		);
	  };
	  
	  export default Convert;	

// const Convert = () => {

// 	const localAudioRef = useRef()

// 	useEffect(()=>{

// 		socket.emit("connection")

// 		const constraints = {
// 			audio:true,
// 			video:false
// 		}
		
// 		if (isRecording){
// 		navigator.mediaDevices.getUserMedia(constraints)
// 			.then(stream =>{
// 				console.log('STREAMING...')
// 				console.log({stream})
// 				localAudioRef.current.srcObject = stream
// 			}) 
// 			.catch(e =>{console.log('error getting user media...',e)})
// 		}else{
// 			console.log('STOPPED STREAMING')
// 		}
	

// 	})

// 	const[isRecording, setRecording] = useState(false)
// 	const clickPlay = ()=>{
// 		setRecording(!isRecording)
// 		console.log('Hello!')
// 	}

	
// 	const Pause = ({isRecording}) => {
		
// 		return (
// 			<div>
			
// 			{!isRecording && (<svg onClick={()=>setRecording(true)} className="button" viewBox="-15 -25 110 110" width="50" height="50">
// 			<circle cx="40" cy="30" r="50" fill='white' stroke='red' strokeWidth='4'/>  
// 			<polygon points="15,0 30,0 30,60 15,60" stroke='black' strokeWidth='4' fill='white' />
// 			<polygon points="50,0 65,0 65,60 50,60" stroke='black' strokeWidth='4' fill='white' />
// 			</svg>
// 			)}
			
// 			{isRecording && (<svg onClick={()=>setRecording(false)} className="button" viewBox="-15 -25 110 110" width="50" height="50">
// 			<circle cx="40" cy="30" r="50" fill='white' stroke='red' strokeWidth='4'/>  
// 			<polygon points="25,0 25,60 75,30" stroke='black' strokeWidth='4' fill="#fff"/>
// 			</svg>
// 			)}
// 			</div>
			
// 			)
// 		}

// return (
// 	<div>
// 		<div style={main}>
// 			<h1 style={{margin:'5%', padding:'20px', color:'#4A4E69'}}>Convert</h1>
// 			<div style={{display:'flex'}}>
// 				<h2 style={{margin:'inherit', marginRight:'10px',fontSize:'2vmax', color:'#4A4E69'}}>Select Target:</h2>
// 				<select style={{margin:'inherit', width:'10vw', minWidth:'60pxl'}} name="speaker" id="speaker-select">
// 					<option value=""></option>
// 					<option value="1">Speaker 1</option>
// 					<option value="2">Speaker 2</option>
// 					<option value="3">Speaker 3</option>

// 				</select>

// 			</div>
// 			<div style={{display:'flex', alignItems:'center',margin:'3%', padding:'3%'}}>
				
// 				<h2 style={{marginRight:'10px',fontSize:'2vmax', color:'#4A4E69'}}>Press to Record:</h2>
// 				<Pause isRecording={isRecording} onPlayerClick={clickPlay}/>

// 			</div>

// 			<div style={{display:'flex', flexDirection:'column', height:'auto', width:'50vw', margin:'45px', justifyContent:'center',alignItems:'center'}}>
// 			{isRecording &&(<h1 style={{margin:'0%',fontSize: '1.8vmax', color:'#4A4E69', alignSelf:'start', justifySelf:'start'}}>Recording...</h1>)}
// 			{!isRecording &&(<h1 style={{margin:'0%',fontSize: '1.8vmax', color:'#4A4E69', alignSelf:'start', justifySelf:'start'}}>Paused</h1>)}
// 			<div style={waveformBar}></div>
// 			<audio ref={localAudioRef}></audio>
// 			</div>
// 		</div>
// 	</div>
// );
// };

// export default Convert;
