import React, { useState } from 'react';
import Footer from "../../src/components/Footer";
import { AudioRecorder } from 'react-audio-voice-recorder';
import { Button2 } from '../components/FileUpload/fileUpload';
import { getAuth } from 'firebase/auth'
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import "../pages/train.css"


const main = {
	height: '0vh',
	width: '100vw',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-between',
	alignItems: 'center',
}

const scriptBox = {
	display: 'flex',
	border: '3px solid #4A4E69',
	width: '30%',
	maxWidth: '550px',
	width: '30%',
	maxWidth: '600px',
	// maxHeight:'750px',
	minHeight: '300px',
	overflowY: 'scroll',
	scrollbarGutter: 'stable',
	scrollbarColor: '#4A4E69',
	margin: '4%',
	fontSize: '1.4em',
	padding: '20px',
	minHeight: '300px',
	overflowY: 'scroll',
	scrollbarGutter: 'stable',
	scrollbarColor: '#4A4E69',
	margin: '2%',
	fontSize: '1.2em',
	padding: '20px'
}

const randomFileName = () => {
	let randomNumber = Math.random().toString().slice(2, -1);

	// Get the current timestamp
	let timestamp = Date.now();

	// Combine the random number and timestamp to create a unique file name
	return 'file_' + timestamp + '_' + randomNumber + '.wav';
}

const storeAudio = (audio) => {
	const storage = getStorage()
	const auth = getAuth()
	// console.log(storage)
	let file = randomFileName()
	let audioFile = new File([audio], file, { type: 'audio/wav' })
	const uid = auth.currentUser.uid
	console.log(uid)
	const storageRef = ref(storage, `AudioSamples/${uid}/${file}`)
	const message = document.getElementById('message')
	uploadBytes(storageRef, audioFile)
		.then((snapshot) => {
			console.log('Uploaded a file!')
			message.textContent = 'File uploaded successfully!'
		})
		.catch((err) => {
			console.error(err)
			message.textContent = 'Failed to upload file.'
		})
}

const Train = () => {
	const [audio_, setAudio] = useState()
	return (
		<>
			<div style={main}>
				<h1 style={{ margin: '2%', padding: '15px', color: '#303978', paddingTop: 20 }}>Train</h1>
				<div style={{ fontSize: '20', color: '#4A4E69', textAlign: 'center' }}>
					To get started, simply press the record button and read the prompts provided. <br />Please make sure you're in a quiet environment and speak clearly and naturally.<br /> We recommend using a headset or microphone for the best results.<br />
					Once you've finished recording, your voice data will be securely uploaded to our servers for processing.</div>
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

				<div style={scriptBox}>
					Once upon a time, in a kingdom far far away, there lived a young boy named Luke. He was weak and often bullied by the other children in his village. Despite this, Luke had a heart full of courage and a determination to prove himself.

					One day, while wandering in the forest, Luke stumbled upon an ancient sword. This was no ordinary sword, it was enchanted and it granted Luke the strength and power he had always wanted. Excited by his newfound abilities, Luke set out on an adventure to defeat the monsters and dragons that terrorized his kingdom.

					Luke soon found that his journey was not going to be easy. He was faced with countless challenges, but he refused to give up. He honed his skills, learned new techniques and grew stronger with each passing day. He battled giant trolls, fire-breathing dragons, and even the evil sorcerer who had cursed his kingdom.
				</div>
				<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '40px' }}>
					<AudioRecorder onRecordingComplete={blob=>setAudio(blob)}></AudioRecorder>
					<Button2 onClick={(e)=>storeAudio(audio_)} style={{marginTop:"20px"}}>Store</Button2>
					<p id="message" style={{marginTop:"20px"}}></p>
				</div>
				<Footer />

			</div>

		</>
	);
};








export default Train;
