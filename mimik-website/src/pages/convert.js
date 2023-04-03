import React, {useState, useRef} from 'react';
import io from "socket.io-client"
// import Footer from "../../src/components/";
import { SearchBar } from '../components/SearchBar/searchbar';
import { SearchResultsList } from '../components/SearchBar/SearchResultsList';
import { FileUploader } from '../components/FileUpload/fileUpload';
// import { Button } from 'bootstrap';
import axios from 'axios'
import Footer from "../../src/components/Footer";


const socket = io('http://localhost:8000')

const main = {
	height:'100%',
	width:'100%',
	display:'flex',
	flexDirection:'column',
	justifyContent:'space-between',
	alignItems:'center',
}


const Convert = () => {

	// const localAudioRef = useRef();

	//search bar results
	const [results, setResults] = useState([])
	const [buttonName, setButtonName] = useState("Play")
	const [audio, setAudio] = useState(null);

	
	//ADD PLAY & UPLOAD BUTTONS 
	
	  
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
	  
	const addFile = (file) => {
		if (file) {
			const ref = document.getElementById('reference');
			const formData = new FormData();
			formData.append('audio', file);
			formData.append('ref_wav',ref.files[0]);
			
			
			// handleFetchAudio()

			axios.post('http://localhost:8000/transcribe', formData, {responseType:'blob',data:'hello'})
				.then((response) => {
					let data = response.data
					let audioBlob = new Blob([data], {type:'audio/wav'})
					let newaudioUrl = URL.createObjectURL(audioBlob)
					setAudio(newaudioUrl)
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};

	return (

		<><div>
			<div style={main}>

				<h1 style={{ margin: '2%', padding: '15px', color: '#303978', textAlign: 'center', fontSize: '200%', fontFamily: 'IM Fell Double Pica' }}>Convert</h1>

				<div style={{ textAlign: 'center', fontSize: 25, paddingTop: 50, paddingBottom: 50, fontFamily: 'IM Fell Double Pica' }}>Please click Upload a file to add your voice and then hit Convert to clone your voice:</div>

				<div>
					<FileUploader handleFile={addFile}/>
					<input id="reference" type="file"/>

				</div>

				<div>
					{/* <button onClick={handleClick}>{buttonName}</button> */}
					{audio && (
						<audio id="audio" controls>
							{/* <source src={`data:audio/wav;base64,${audio}`} type="audio/wav" /> */}
							<source src={audio} type="audio/wav" />

						</audio>
					)}
				</div>

				<div style={{ border: '1px solid #dfdfdf', backgroundColor: ' #fff', textAlign: 'center', width: '75%', margin: 'auto', margin: '25px 25px', borderRadius: '15px', paddingTop: '2rem' }}>

					<div className='Search' style={{ margin: '5px', padding: '0px', fontFamily: 'IM Fell Double Pica', align: 'center' }}>
						<div className='search-bar-container' style={{ PaddingTop: '20vh', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '200px' }}>
							<SearchBar setResults={setResults} />
							<SearchResultsList results={results} />
						</div>

					</div>
				</div>





			</div>
		</div><Footer /></>
	);
}

export default Convert;
