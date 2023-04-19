import React, {useState, useEffect} from 'react';
// import io from "socket.io-client"
import { SearchBar } from '../components/SearchBar/searchbar';
import { SearchResultsList } from '../components/SearchBar/SearchResultsList';
import { FileUploader } from '../components/FileUpload/fileUpload';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import './Convert/convert.css'
// import { Button } from 'bootstrap';
//import Dropzone from '../components/AudioDropzone/dropzone'
import axios from 'axios'
import { storage } from '../firebase';
// import { ref, getDownloadURL, getBlob } from 'firebase/storage';
import { AudioRecorder } from 'react-audio-voice-recorder'
import 'firebase/storage'
// const socket = io('http://localhost:8000')

const main = {
	height:'100%',
	width:'100%',
	display:'flex',
	flexDirection:'column',
	justifyContent:'space-between',
	alignItems:'center',
}

const Convert =  () => {
	// let dbJSON = db.toJSON()
	// console.log(dbJSON)
	
	//search bar results
	const [inputMode, setInputMode] = useState(0)
	const [isLoading, setLoading] = useState(false)
	const [results, setResults] = useState([])
	const [audio, setAudio] = useState(null);

	const addAudioElement = (blob) => {
		const url = URL.createObjectURL(blob);
		const audio = document.createElement("audio")
		audio.src = url;
		audio.controls = true;
		document.getElementById("recordedAudio").appendChild(audio)
		console.log(audio)
	}

	const processAudioFiles = (contentFile, referenceFile) => {
		setAudio(null)
		setLoading(true);
		const formData = new FormData();
		formData.append('content', contentFile);
			
		const ref = document.getElementById('reference');
		if (referenceFile)
			formData.append('reference',referenceFile);
		
		axios.post('http://localhost:8000/clone', formData, {responseType:'blob',data:'Sending audio'})
			.then((response) => {
				let data = response.data
				let audioBlob = new Blob([data], {type:'audio/wav'})
				let newaudioUrl = URL.createObjectURL(audioBlob)
				setAudio(newaudioUrl)
				ref.files = []
				console.log(ref.files)
				setLoading(false);
				// console.log(data)
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
			});
	}

	const processText = (text) =>{
		setAudio(null)
		setLoading(true);
		// const formData = new FormData();
		// formData.append('content', contentFile);
		console.log(text)
		const ref = document.getElementById('reference');
		axios.post('http://localhost:8000/clone_text', text, {responseType:'blob',data:'Sending audio'})
			.then((response) => {
				let data = response.data
				let audioBlob = new Blob([data], {type:'audio/wav'})
				let newaudioUrl = URL.createObjectURL(audioBlob)
				setAudio(newaudioUrl)
				ref.files = []
				console.log(ref.files)
				setLoading(false);
				// console.log(data)
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
			});
	}

	return (

		<div>
			<div style={main}>

				<h1 style={{margin:'2%', padding:'15px', color:'#303978', textAlign: 'center', fontSize:'200%', fontFamily:'IM Fell Double Pica'}}>Convert</h1>

				<div style={{textAlign: 'center', fontSize: 20, paddingBottom: 50, fontFamily: 'IM Fell Double Pica'}}>Please click Upload a Content File to add a sample of your voice<br/> and Upload a Reference File to add a sample of the voice you'd like to sound like. <br/>Hit Convert to clone your voice:</div>
				<div style={{display:'flex', alignItems:'', borderColor: 'black', borderWidth:'2px', borderStyle:'solid', borderRadius:'20px', margin:'20px'}}>
					<div style={{margin:'20px'}}>
						<label for='audioFileInput'>Files</label>
						<input type='radio' id='audioFileInput' name='audioInputType' value={0} onClick={(e)=>{setInputMode(0)}} ></input>
					</div>
					<div style={{margin:'20px'}}>
						<label for='textInput'>Text</label>
						<input type='radio' id='textInput' name='audioInputType' value={1} onClick={(e)=>{setInputMode(1)}} ></input>
					</div>
					<div style={{margin:'20px'}}>
						<label for='audioRecordingInput'>Record</label>
						<input type='radio' id='audioRecordingInput' name='audioInputType' value={2} onClick={(e)=>{setInputMode(2)}} ></input>
					</div>
				</div>
				<div>
					{inputMode === 0 && <FileUploader handleFile={processAudioFiles}/>}
					{inputMode === 1 && 
					<div style={{padding:'30px'}}>
						<input id='textEl' type='text' placeholder='Type the text to convert' borderColor='#6969A8'></input>
						<button  style={{paddingLeft:'10px'}}onClick={processText}>Convert</button>
					</div>
					}{
						inputMode === 2 &&
						<div>
							Content Audio:<AudioRecorder onRecordingComplete={addAudioElement}></AudioRecorder>
							{/* Reference Audio: <AudioRecorder onRecordingComplete={addAudioElement}></AudioRecorder> */}
						</div>
					}

				</div>
				
				<div>
					<AiOutlineLoading3Quarters className={`icon ${isLoading? 'isAnimated' : 'notAnimated'}`} />
					<div id = "recordedAudio">

					</div>	
					{audio && ( 
						<div style={{marginTop: 50, display: 'flex', alignItems: 'center'}}>Your cloned output is:
						
						<audio id="audio" controls style={{marginLeft: 20}}>
							<source src={audio} type="audio/wav" />
						</audio>
						</div>
					)}
				</div>

				<div style={{ border: '1px solid #dfdfdf', backgroundColor:' #fff', textAlign: 'center', width: '75%',margin: '25px 25px',borderRadius: '15px', paddingTop:'2rem' }}>

					<div className='Search' style={{margin:'5px', padding:'0px',fontFamily:'IM Fell Double Pica', align:'center'}} >
						<div className='search-bar-container' style={{ width:'100%', display:'flex', flexDirection: 'column', alignItems:'center', minWidth:'200px'}}>
							<SearchBar setResults={setResults}/>
							<SearchResultsList results = {results}/>
						</div>

					</div>
				</div>

			</div>
		</div>
	);
}

export default Convert;
