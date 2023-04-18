import React, {useState} from 'react';
import Footer from "../../src/components/Footer";
import "../pages/train.css"


const main = {
	height:'0vh',
	width:'100vw',
	display:'flex',
	flexDirection:'column',
	justifyContent:'space-between',
	alignItems:'center',
}

const scriptBox = {
	display: 'flex',
	border: '3px solid #4A4E69',
	width:'30%',
	maxWidth:'600px',
	// maxHeight:'750px',
	minHeight:'300px',
	overflowY:'scroll',
	scrollbarGutter:'stable',
	scrollbarColor:'#4A4E69',
	margin:'2%',
	fontSize:'1.2em',
	padding:'20px'
}

const waveformBar = {
	background: '#d1d1d1',
	width: '100%',
	height:'40px'
}


const Train = () => {
	const[isRecording, setRecording] = useState(false)
	const clickPlay = ()=>{
		setRecording(!isRecording)
		console.log('Hello!')
	}
	
	const Pause = ({isRecording}) => {
		
		return (
			<div>
			
			{!isRecording && (<svg onClick={()=>setRecording(true)} className="button" viewBox="-15 -25 110 110" width="50" height="50">
			<circle cx="40" cy="30" r="50" fill='white' stroke='red' stroke-width='4'/>  
			<polygon points="15,0 30,0 30,60 15,60" stroke='black' stroke-width='4' fill='white' />
			<polygon points="50,0 65,0 65,60 50,60" stroke='black' stroke-width='4' fill='white' />
			</svg>
			)}
			
			{isRecording && (<svg onClick={()=>setRecording(false)} className="button" viewBox="-15 -25 110 110" width="50" height="50">
			<circle cx="40" cy="30" r="50" fill='white' stroke='red' stroke-width='4'/>  
			<polygon points="25,0 25,60 75,30" stroke='black' stroke-width='4' fill="#fff"/>
			</svg>
			)}
			</div>
			
			)
		}
		
		return (
			<>
			<div style={{ height: '100vh' }}>
				<div style={main}>
					<h1 style={{ margin: '2%', padding: '15px', color: '#303978', paddingTop: 20 }}>Train</h1>
					<div style={{fontSize: '20', color: '#4A4E69', textAlign: 'center' }}>
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
					<Pause isRecording={isRecording} onPlayerClick={clickPlay} style={{ height: '20px', width: '20px' }} />

					<div style={{ display: 'flex', flexDirection: 'column', height: 'auto', width: '50vw', margin: '45px', justifyContent: 'center', alignItems: 'center' }}>
						{isRecording && (<h1 style={{ margin: '0%', fontSize: '1.8vmax', color: '#4A4E69', alignSelf: 'start', justifySelf: 'start' }}>Recording...</h1>)}
						{!isRecording && (<h1 style={{ margin: '0%', fontSize: '1.8vmax', color: '#4A4E69', alignSelf: 'start', justifySelf: 'start' }}>Paused</h1>)}
						<div style={waveformBar}></div>
					</div>
				</div>
				{/* <div style={{display:'sticky',marginTop:'10px',marginBottom:'10px',background:'#4A4E69', height:'30px', width:'100%'}}> </div> */}

			</div>

			</>
			);
		};

		





		
		export default Train;
		