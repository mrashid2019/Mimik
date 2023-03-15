import React, {useState, useEffect, useRef} from 'react';
import io from "socket.io-client"
import Footer from '../components/Footer/index'
import { SearchBar } from '../components/SearchBar/searchbar';
import { SearchResultsList } from '../components/SearchBar/SearchResultsList';



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


const Convert = () => {

	const localAudioRef = useRef()

	useEffect(()=>{

		socket.emit("connection")

		const constraints = {
			audio:true,
			video:false
		}
		
		if (isRecording){
		navigator.mediaDevices.getUserMedia(constraints)
			.then(stream =>{
				console.log('STREAMING...')
				console.log({stream})
				localAudioRef.current.srcObject = stream
			}) 
			.catch(e =>{console.log('error getting user media...',e)})
		}else{
			console.log('STOPPED STREAMING')
		}
	

	})

	const[isRecording, setRecording] = useState(false)
	const clickPlay = ()=>{
		setRecording(!isRecording)
		console.log('Hello!')
	}

	
	const Pause = ({isRecording}) => {
		
		return (
			<div>
			
			{!isRecording && (<svg onClick={()=>setRecording(true)} className="button" viewBox="-15 -25 110 110" width="50" height="50">
			<circle cx="40" cy="30" r="50" fill='white' stroke='red' strokeWidth='4'/>  
			<polygon points="15,0 30,0 30,60 15,60" stroke='black' strokeWidth='4' fill='white' />
			<polygon points="50,0 65,0 65,60 50,60" stroke='black' strokeWidth='4' fill='white' />
			</svg>
			)}
			
			{isRecording && (<svg onClick={()=>setRecording(false)} className="button" viewBox="-15 -25 110 110" width="50" height="50">
			<circle cx="40" cy="30" r="50" fill='white' stroke='red' strokeWidth='4'/>  
			<polygon points="25,0 25,60 75,30" stroke='black' strokeWidth='4' fill="#fff"/>
			</svg>
			)}
			</div>
			
			)
		}


	//search bar results
	const [results, setResults] = useState([])



return (

	<div>
		<div style={main}>

			<h1 style={{margin:'2%', padding:'15px', color:'#303978', textAlign: 'center', fontSize:'375%', fontFamily:'IM Fell Double Pica'}}>Convert</h1>
			
			<div style={{ border: '1px solid #dfdfdf', backgroundColor:' #fff', textAlign: 'center', width: '75%',margin: 'auto',margin: '25px 25px',borderRadius: '15px', paddingTop:'2rem' }}>

				<div className='Search' style={{margin:'5px', padding:'0px',fontFamily:'IM Fell Double Pica', align:'center'}} >
					<div className='search-bar-container' style={{ PaddingTop:'20vh', width:'100%', display:'flex', flexDirection: 'column', alignItems:'center', minWidth:'200px'}}>
						<SearchBar setResults={setResults}/>
						<SearchResultsList results = {results}/>
					</div>

				</div>
			</div>
			
			
			{/* <div style={{display:'flex'}}>
				<h2 style={{margin:'inherit', marginRight:'10px',fontSize:'2vmax', color:'#4A4E69'}}>Select Target:</h2>
				<select style={{margin:'inherit', width:'10vw', minWidth:'60pxl'}} name="speaker" id="speaker-select">
					<option value=""></option>
					<option value="1">Speaker 1</option>
					<option value="2">Speaker 2</option>
					<option value="3">Speaker 3</option>

				</select>

			</div>
			<div style={{display:'flex', alignItems:'center',margin:'3%', padding:'3%'}}>
				
				<h2 style={{marginRight:'10px',fontSize:'2vmax', color:'#4A4E69'}}>Press to Record:</h2>
				<Pause isRecording={isRecording} onPlayerClick={clickPlay}/>

			</div>

			<div style={{display:'flex', flexDirection:'column', height:'auto', width:'50vw', margin:'45px', justifyContent:'center',alignItems:'center'}}>
			{isRecording &&(<h1 style={{margin:'0%',fontSize: '1.8vmax', color:'#4A4E69', alignSelf:'start', justifySelf:'start'}}>Recording...</h1>)}
			{!isRecording &&(<h1 style={{margin:'0%',fontSize: '1.8vmax', color:'#4A4E69', alignSelf:'start', justifySelf:'start'}}>Paused</h1>)}
			<div style={waveformBar}></div>
			<audio ref={localAudioRef}></audio>
			</div> */}


		</div>
	</div>
);
};

export default Convert;
