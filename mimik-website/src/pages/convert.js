import React, {useState, useEffect} from 'react';
// import io from "socket.io-client"
import { SearchBar } from '../components/SearchBar/searchbar';
import { SearchResultsList } from '../components/SearchBar/SearchResultsList';
import { FileUploader } from '../components/FileUpload/fileUpload';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import './Convert/convert.css'
import axios from 'axios'
import { storage } from '../firebase';
// import { ref, getDownloadURL, getBlob } from 'firebase/storage';

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
	const [isLoading, setLoading] = useState(false)
	const [results, setResults] = useState([])
	const [audio, setAudio] = useState(null);

	useEffect(()=>{
		console.log("Getting data")

		let storageRef = storage.ref()
		let fileRef = storageRef.child('/VoiceModels/Adrian/config.json')
		fileRef.getDownloadURL()
		.then(url=>{
			console.log(url)
			fetch(url)
			.then(response => response.json())
			.then(data =>{
				console.log(data)
			})
			.catch(err=>console.error("ERROR:",err))
		})
		.catch(err=>{
			console.log("ERROR:",err)
		})
		// getBlob(storageRef)
		// .then(data=>{
		// 	if(data)
		// 		console.log(jsonEval(data))
		// 	else
		// 		console.log("EMPTY")
		// })
		// .catch(err=>{
		// 	console.error("TRIED AND FAILED:",err)
		// })

		// getDownloadURL(storageRef)
		// .then(val=>{
		// 	console.log(val)
		// 	fetch(val)
		// 	.then((val)=>console.log(val))
		// 	.catch(err=>console.error(err))
		// })
		// .catch(err=>{
		// 	console.log(err)
		// })
	},[])
	const transcribe = (contentFile, referenceFile) => {
		console.log({contentFile},{referenceFile})
		setLoading(true);
		const formData = new FormData();
		formData.append('content', contentFile);
			
		const ref = document.getElementById('reference');
		if (referenceFile)
			formData.append('reference',referenceFile);
		
		axios.post('http://localhost:8000/transcribe', formData, {responseType:'blob',data:'Sending audio'})
			.then((response) => {
				let data = response.data
				let audioBlob = new Blob([data], {type:'audio/wav'})
				let newaudioUrl = URL.createObjectURL(audioBlob)
				setAudio(newaudioUrl)
				ref.files = []
				console.log(ref.files)
				setLoading(false);
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

				<div style={{textAlign: 'center', fontSize: 25, paddingTop: 50, paddingBottom: 50, fontFamily: 'IM Fell Double Pica'}}>Please click Upload a file to add your voice and then hit Convert to clone your voice:</div>

				<div>
					<FileUploader handleFile={transcribe}/>
					{/* <input id="reference" type="file"/> */}

				</div>

				<div>
					{audio && (
						<audio id="audio" controls>
							<source src={audio} type="audio/wav" />
						</audio>
					)}
				</div>

				<div style={{ border: '1px solid #dfdfdf', backgroundColor:' #fff', textAlign: 'center', width: '75%',margin: '25px 25px',borderRadius: '15px', paddingTop:'2rem' }}>

					<div className='Search' style={{margin:'5px', padding:'0px',fontFamily:'IM Fell Double Pica', align:'center'}} >
						<div className='search-bar-container' style={{ PaddingTop:'20vh', width:'100%', display:'flex', flexDirection: 'column', alignItems:'center', minWidth:'200px'}}>
							<SearchBar setResults={setResults}/>
							<SearchResultsList results = {results}/>
						</div>

					</div>
					 <AiOutlineLoading3Quarters className={`icon ${isLoading? 'isAnimated' : 'notAnimated'}`} />
				</div>

			</div>
		</div>
	);
}

export default Convert;
