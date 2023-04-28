import React, { useState, useRef, useEffect } from 'react';
// import io from "socket.io-client"
import { SearchBar } from '../components/SearchBar/searchbar';
import { SearchResultsList } from '../components/SearchBar/SearchResultsList';
import { FileUploader, Button } from '../components/FileUpload/fileUpload';
import { AiOutlineLoading3Quarters, AiOutlineSearch } from 'react-icons/ai';
import './Convert/convert.css'
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios'
import { AudioRecorder } from 'react-audio-voice-recorder'
import { Box, Modal } from '@mui/material'


import 'firebase/storage'
// const socket = io('http://localhost:8000')

const main = {
	height: '100%',
	width: '100%',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-between',
	alignItems: 'center',
}

const Convert = () => {
	// let dbJSON = db.toJSON()
	// console.log(dbJSON)

	//search bar results



	const [contentMode, setContentMode] = useState(0)
	const [referenceMode, setReferenceMode] = useState(0)
	const [isLoading, setLoading] = useState(false)
	const [results, setResults] = useState([])
	const [audio, setAudio] = useState(undefined);
	const [disabled, setDisabled] = useState(true)
	const contentRef = useRef(null);
	const referenceRef = useRef(null);
	const [isModalActive, setModalActive] = useState(false)

	useEffect(() => {

	}, [contentRef.current, referenceRef.current])


	const createAudioElementFromBlob = (blob, elementId) => {
		
		const url = URL.createObjectURL(blob);
		let audioEl = new Audio(url)
		audioEl.id = elementId
		// audioEl.src = url;
		audioEl.controls = true;

		if (elementId === "refAudio") {
			referenceRef.current = new File([blob], 'refAudio.wav', { type: 'audio/wav' });
		}
		 else {
			contentRef.current = new File([blob], 'contentAudio.wav', { type: 'audio/wav' });

		}
		return audioEl
	}

	const createAudioElementFromFile = (e,elementId) =>{
		let audioFile = e.target.files[0]
		const url = URL.createObjectURL(blob);
		let audioEl = new Audio(url)

		if (elementId === "refAudio") {
			
		}
		 else {
		
		}
		return audioEl
	}
	
	const filterAudioContainer = (container,elementId) =>{
		container.childNodes.forEach(
			(child) => {

				if (child.id === elementId) {
					console.log(child);
					container.removeChild(child);
				}
			}
		)
	}

	const addElementToContainer = (el,container)=>{
		filterAudioContainer(container, el.id)
		container.append(el)
		if (container.childElementCount > 1) {
			setDisabled(false)
		}
		return container
	}

	
	const handleFile = (e) =>{
		let audioContainer = document.getElementById("audioContainer")
		let audioEl = createAudioElementFromFile(e,elementId)
		addElementToContainer(audioEl, audioContainer)


	}

	const handleRecording = (blob, elementId)=>{
		let audioContainer = document.getElementById("audioContainer")
		let audioEl = createAudioElementFromBlob(blob,elementId)
		addElementToContainer(audioEl, audioContainer)

	}

	const processAudioFiles = () => {
		setAudio(null)
		setLoading(true);
		const formData = new FormData();
		const contentAudio = document.getElementById('contentAudio')
		const refAudio = document.getElementById('refAudio')

		// formData.append('content', contentAudio.src.file);
		// formData.append('reference', refAudio.src.file);

		formData.append('content', contentRef.current);
		formData.append('reference', referenceRef.current);
		// // const ref = document.getElementById('reference');
		// if (referenceFile)
		// 	formData.append('reference', referenceFile);

		axios.post('http://localhost:8000/clone', formData, { responseType: 'blob' })
			.then((response) => {
				let data = response.data
				let audioBlob = new Blob([data], { type: 'audio/wav' })
				let newaudioUrl = URL.createObjectURL(audioBlob)
				setAudio(newaudioUrl)
				// ref.files = []
				// console.log(ref.files)
				setLoading(false);
				// console.log(data)
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
			});
	}

	const processText = () => {
		setAudio(null)
		setLoading(true);
		// const formData = new FormData();
		// formData.append('content', contentFile);
		const text = document.getElementById('textEl').value
		console.log(text)
		const ref = document.getElementById('reference');

		axios.post('http://localhost:8000/clone_text', text, { responseType: 'blob' })
			.then((response) => {
				let data = response.data
				let audioBlob = new Blob([data], { type: 'audio/wav' })
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

	const AudioCarousel = () => {

		const [index, setIndex] = useState(0);
		const handleSelect = (e) => {
			if (index == 0)
				setIndex(1)
			else
				setIndex(0)
		}

		const getAudio = ()=>{
			let targetContentElId = ""
			let targetReferenceElId = ""

			if (contentMode === 0){
				targetContentElId ='audioFileInput' 
			}else if(contentMode === 1){
				targetContentElId = 'textEl'
			}else{
				targetContentElId = 'contentAudio'
			}

			let contentEl = document.getElementById(targetContentElId)

			if (referenceMode === 0){
				targetReferenceElId ='audioFileInput' 
			}else if(contentMode === 1){
				targetReferenceElId = 'textEl'
			}else{
				targetReferenceElId = 'contentAudio'
			}
		}

		return (
			<Carousel variant='dark' activeIndex={index} onSelect={handleSelect} >
				<Carousel.Item interval={null}>
					<div className='inputBox'>
						<h4>Content</h4>
						<div id="contentSection" style={{ display: 'flex' }}>
							<div style={{ margin: '20px' }}>
								<label htmlFor='audioFileInput'>File</label>
								<input type='radio' id='audioFileInput' name='contentInputType' value={0} defaultChecked={contentMode === 0} onClick={(e) => { setContentMode(0) }} ></input>
							</div>
							<div style={{ margin: '20px' }}>
								<label htmlFor='textInput'>Text</label>
								<input type='radio' id='textInput' name='contentInputType' value={1} onClick={(e) => { setContentMode(1) }} ></input>
							</div>
							<div style={{ margin: '20px' }}>
								<label htmlFor='audioRecordingInput'>Record</label>
								<input type='radio' id='audioRecordingInput' name='contentInputType' value={2} onClick={(e) => { setContentMode(2) }} ></input>
							</div>
						</div>

						<div style={{ display: 'flex' }}>
							{contentMode === 0 && <FileUploader id={'a'} onInput={(e)=>handleFile(e,"contentAudio")} />}
							{/* {contentMode === 0 && <Button onClick={processAudioFiles}>Add File</Button>} */}

							{contentMode === 1 &&
								<input id='textEl' type='text' placeholder='Type the text to convert' borderColor='#6969A8'></input>
							}{
								contentMode === 2 &&
								<div>
									<AudioRecorder onRecordingComplete={(blob) => { handleRecording(blob, "contentAudio") }}></AudioRecorder>
								</div>
							}

						</div>
					</div>


				</Carousel.Item>
				<Carousel.Item interval={null}>
					<div className='inputBox'>
						<h4>Reference</h4>

						<div id="refSection" style={{ display: 'flex' }}>
							<div style={{ margin: '20px' }}>
								<label htmlFor='audioRefFileInput'>File</label>
								<input type='radio' id='audioRefFileInput' name='referenceInputType' value={0} defaultChecked={referenceMode === 0} onClick={(e) => { setReferenceMode(0) }} ></input>
							</div>
							<div style={{ margin: '20px' }}>
								<label htmlFor='audioRefRecordingInput'>Record</label>
								<input type='radio' id='audioRefRecordingInput' name='referenceInputType' value={1} onClick={(e) => { setReferenceMode(1) }} ></input>
							</div>
							<div style={{ margin: '20px' }}>
								{/* <label for='audioRefRecordingInput'>Search</label> */}
								<AiOutlineSearch onClick={setModalActive(true)}></AiOutlineSearch>
							</div>

						</div>


						<div style={{ display: 'flex' }}>

							{referenceMode === 0 && <FileUploader id={'b'} onInput={(e)=>handleFile(e, "refAudio")}></FileUploader>}
							{
								referenceMode === 1 &&
								<div style={{ display: 'flex', alignItems: 'center' }}>
									<AudioRecorder onRecordingComplete={(blob) => { handleRecording(blob, "refAudio") }}></AudioRecorder>
								</div>
							}
						</div>

					</div>
				</Carousel.Item>
			</Carousel>
		)
	}
	let topText = <p>Please provide the Content of the speech you would like to be spoken in  {<br />} and a Reference audio file containinging the voice you'd like to sound like.{<br />} Once complete click Convert to clone your voice:</p>;

	return (


		<div>
			<div style={main}>

				<h1 style={{ margin: '2%', padding: '15px', color: '#303978', textAlign: 'center', fontSize: '200%', fontFamily: 'IM Fell Double Pica' }}>Convert</h1>

				<div style={{ textAlign: 'center', fontSize: 20, paddingBottom: 50, fontFamily: 'IM Fell Double Pica' }}>{topText}</div>

				<div style={{ display: 'flex' }}>


				</div>

				<div style={{ width: '100%', height: '500px' }}>
					<AudioCarousel></AudioCarousel>

				</div>

				<div className='audioContainer' id="audioContainer">

				</div>
				<Button onClick={processAudioFiles} disabled={disabled}>Convert</Button>


				<div style={{ backgroundColor: ' #fff', textAlign: 'center', width: '75%', margin: '25px 25px', borderRadius: '15px', paddingTop: '2rem' }}>

					<div className='Search' style={{ margin: '5px', padding: '0px', fontFamily: 'IM Fell Double Pica', align: 'center' }} >
						<div className='search-bar-container' style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '200px' }}>


						</div>

					</div>
				</div>


				<div>


					<AiOutlineLoading3Quarters className={`icon ${isLoading ? 'isAnimated' : 'notAnimated'}`} />

					{audio && (
						<div style={{ marginTop: 50, display: 'flex', alignItems: 'center' }}>Your cloned output is:

							<audio id="audio" controls style={{ marginLeft: 20 }}>
								<source src={audio} type="audio/wav" />
							</audio>
						</div>
					)}
				</div>

				<Modal
					open={false}

				>
					<Box style={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						width: 400,
						backgroundColor: 'white',
						boxShadow: 24,
						p: 4,
					}}>
						<SearchBar setResults={setResults} />
						<SearchResultsList results={results} setModalActive={setModalActive} />
					</Box>
				</Modal>

			</div>
		</div>
	);
}

// export default Convert;
