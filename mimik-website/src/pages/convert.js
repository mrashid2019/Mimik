import { useState, useRef, useEffect } from "react";
import { AudioRecorder } from "react-audio-voice-recorder";
import { AiOutlineLoading3Quarters, AiOutlineSearch } from "react-icons/ai";
import { FileUploader } from "../components/FileUpload/fileUpload";
import * as utils from '../utils'
import { Button } from "../components/FileUpload/fileUpload";
import './Convert/convert.css';
import axios from "axios";
import Footer from "../components/Footer";

const main = {
	height: '0vh',
	width: '100vw',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-between',
	alignItems: 'center',
}

async function createFileFromAudioElement(source) {
	return fetch(source)
		.then((response) => response.blob())
		.then(blob => {
			const file = new File([blob], 'audio.wav', { type: 'audio/wav' });
			return file;
		})
		.catch(err => {
			console.error(err);
		})
}

export default function Convert() {

	const [contentMode, setContentMode] = useState(0);
	const [referenceMode, setReferenceMode] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [isDisabled, setIsDisabled] = useState(true);
	const [audio, setAudio] = useState();
	const [containerWatcher, triggerEffect] = useState();
	const containerRef = useRef()

	useEffect(() => {
		if (containerWatcher > 1) {
			setIsDisabled(false);
		}
	}, [containerWatcher])

	function handleChangeInputMode(e, modeSetter) {
		modeSetter(parseInt(e.target.value));
	}

	function handleBlob(blob, elementId) {
		let newAudioEl = utils.createAudioElementFromBlob(blob, elementId);
		utils.addElementToContainer(newAudioEl, 'audioContainer')
		triggerEffect(containerRef.current.childElementCount);
	}

	function handleFile(e, elementId) {
		utils.extractBlob(e.target).then(blob => {
			let newAudioEl = utils.createAudioElementFromBlob(blob, elementId);
			utils.addElementToContainer(newAudioEl, 'audioContainer')
			triggerEffect(containerRef.current.childElementCount);
		}).catch(err => (console.error(err)))

	}

	function handleText(e) {
		let textEl = document.createElement('p');
		textEl.id = 'desiredContent';
		textEl.innerText = e.target.value;
		utils.addElementToContainer(textEl, 'audioContainer');

	}

	const processAudioFiles = async () => {
		setAudio(null)
		setIsLoading(true);
		let formData = new FormData();
		let container = containerRef.current;
		console.log({ container })
		let iterator = container.childNodes;
		let ls = [];
		for (const child of iterator) {

			if (child.id != 'desiredContent') {
				let entry = await createFileFromAudioElement(child.src)
					.then(file => {
						console.log({ file })
						if (child.id === 'contentAudio') {
							return ['content', file];

						} else if (child.id === 'refAudio') {
							return ['reference', file];
						} else if (child.id === 'desiredContent') {
							console.log({ child })
						}
					})
					.catch(err => { console.error(err) })
				console.log("ENTRY:", entry);
				ls.push(entry);
			} else {
				ls.push({ 'text': child.innerText });
			}



		}
		console.log({ ls })
		ls.forEach((entry) => {
			console.log(entry);
			if (entry.text) {
				formData.append('text', entry.text);
			} else {
				formData.append(entry[0], entry[1]);
			}
		})
		let formValues = formData.entries();
		for (const value of formValues) {
			console.log({ value })
		}

		axios.post('https://mimik-api.com/clone', formData, { responseType: 'blob'})
			.then((response) => {
				let data = response.data
				let audioBlob = new Blob([data], { type: 'audio/wav' })
				let newaudioUrl = URL.createObjectURL(audioBlob)
				setAudio(newaudioUrl)
				// ref.files = []
				// console.log(ref.files)
				setIsLoading(false);
				// console.log(data)
			})
			.catch((error) => {
				console.log(error);
				setIsLoading(false);
			});

	}

	return (
		<>
			{/* <div style={{display:'flex',flexDirection:'column', alignItems:'center'}}> */}
			<div style={main}>
				<h1 style={{ margin: '2%', padding: '15px', color: '#303978', paddingTop: 20 }}>Convert</h1>
				<div style={{ fontSize: '20', color: '#4A4E69', textAlign: 'center' }}>
					<div>To upload a sample of your voice, please click on Upload a Content File below.<br />
						Additionally, to provide a sample of the voice that you want to sound like, please upload a reference file by clicking on Upload a Reference File. <br />
						Once both files have been uploaded, hit Convert to clone your voice.</div></div>
				<div class='animation-container'>
					<div class='animation-example'>
						<div class='item'>
							<div class='line'></div>
							<div class='dot'></div>
							<div class='circle'></div>
						</div>
						<div class='item'>
							<div class='line'></div>
							<div class='dot'></div>
							<div class='circle'></div>
						</div>
						<div class='item'>
							<div class='line'></div>
							<div class='dot'></div>
							<div class='circle'></div>
						</div>
						<div class='item'>
							<div class='line'></div>
							<div class='dot'></div>
							<div class='circle'></div>
						</div>
						<div class='item -type2'>
							<div class='line'></div>
							<div class='dot'></div>
							<div class='circle'></div>
						</div>
						<div class='item -type2'>
							<div class='line'></div>
							<div class='dot'></div>
							<div class='circle'></div>
						</div>
						<div class='item -type2'>
							<div class='line'></div>
							<div class='dot'></div>
							<div class='circle'></div>
						</div>
						<div class='item -type2'>
							<div class='line'></div>
							<div class='dot'></div>
							<div class='circle'></div>
						</div>
						<div class='center'>
							<div class='circle'></div>
							<div class='circle'></div>
							<div class='circle'></div>
						</div>
					</div>
				</div>
				<div className='inputSection'>
					<div className='inputBox'>
						<h4>Content</h4>
						<div id="contentSection" style={{ display: 'flex', width: '500px', justifyContent: 'center' }}>
							<div style={{ margin: '20px' }}>
								<label htmlFor='audioFileInput'>File</label>
								<input type='radio' id='audioFileInput' name='contentInputType' value={0} defaultChecked={true} onClick={(e) => handleChangeInputMode(e, setContentMode)} ></input>
							</div>
							<div style={{ margin: '20px' }}>
								<label htmlFor='textInput'>Text</label>
								<input type='radio' id='textInput' name='contentInputType' value={1} onClick={(e) => handleChangeInputMode(e, setContentMode)} ></input>
							</div>
							<div style={{ margin: '20px' }}>
								<label htmlFor='audioRecordingInput'>Record</label>
								<input type='radio' id='audioRecordingInput' name='contentInputType' value={2} onClick={(e) => handleChangeInputMode(e, setContentMode)} ></input>
							</div>
						</div>

						<div style={{ display: 'flex' }}>
							{contentMode === 0 && <FileUploader id={'contentAudio'} handler={handleFile} />}

							{contentMode === 1 &&
								<input id='textEl' type='text' placeholder='Type the text to convert' onInput={handleText}></input>
							}{
								contentMode === 2 &&
								<div>
									<AudioRecorder onRecordingComplete={(blob) => handleBlob(blob, 'contentAudio')}></AudioRecorder>
								</div>
							}
						</div>
					</div>

					<div className='inputBox'>
						<h4>Reference</h4>

						<div id="refSection" style={{ display: 'flex', width: '500px', justifyContent: 'center' }}>
							<div style={{ margin: '20px' }}>
								<label htmlFor='audioRefFileInput'>File</label>
								<input type='radio' id='audioRefFileInput' name='referenceInputType' value={0} defaultChecked={referenceMode === 0} onClick={(e) => handleChangeInputMode(e, setReferenceMode)} ></input>
							</div>
							<div style={{ margin: '20px' }}>
								<label htmlFor='audioRefRecordingInput'>Record</label>
								<input type='radio' id='audioRefRecordingInput' name='referenceInputType' value={1} onClick={(e) => handleChangeInputMode(e, setReferenceMode)} ></input>
							</div>

						</div>


						<div style={{ display: 'flex' }}>

							{referenceMode === 0 && <FileUploader id={'refAudio'} handler={handleFile} />}
							{
								referenceMode === 1 &&
								<div style={{ display: 'flex', alignItems: 'center' }}>
									<AudioRecorder onRecordingComplete={(blob) => handleBlob(blob, 'refAudio')}></AudioRecorder>
								</div>
							}
						</div>

					</div>

				</div>
				<div className='audioContainer' id="audioContainer" ref={containerRef}>

				</div>

				<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
					<Button disabled={isDisabled} onClick={processAudioFiles}>Convert</Button>
					<AiOutlineLoading3Quarters className={`icon ${isLoading ? 'isAnimated' : 'notAnimated'}`} />

				</div>

				<div style={{ position: 'relative', paddingBottom: '5%', marginBottom: '5%',backgroundColor:'fff'}}>


					{audio && (
						<div style={{ marginTop: 50, display: 'flex', alignItems: 'center' }}>
							Output:

							<audio id="audio" controls style={{ marginLeft: 20 }}>
								<source src={audio} type="audio/wav" />
							</audio>
						</div>
					)}
				</div>
				<Footer />

			</div>
			{/* <Footer /> */}

		</>
	)
}