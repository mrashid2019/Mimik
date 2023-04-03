import React, {useState} from 'react';
import Footer from "../../src/components/Footer";


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
	maxWidth:'550px',
	// maxHeight:'750px',
	minHeight:'300px',
	overflowY:'scroll',
	scrollbarGutter:'stable',
	scrollbarColor:'#4A4E69',
	margin:'4%',
	fontSize:'1.4em',
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
			<><div style={{ height: '100vh' }}>
				<div style={main}>
					<h1 style={{ margin: '5%', color: '#4A4E69' }}>Train</h1>
					<h1 style={{ margin: '0%', fontSize: '1.3vmax', color: '#4A4E69' }}>Press record and begin reading the script at your own pace</h1>
					<div style={scriptBox}>
						Once upon a time, in a kingdom far far away, there lived a young boy named Luke. He was weak and often bullied by the other children in his village. Despite this, Luke had a heart full of courage and a determination to prove himself.

						One day, while wandering in the forest, Luke stumbled upon an ancient sword. This was no ordinary sword, it was enchanted and it granted Luke the strength and power he had always wanted. Excited by his newfound abilities, Luke set out on an adventure to defeat the monsters and dragons that terrorized his kingdom.

						Luke soon found that his journey was not going to be easy. He was faced with countless challenges, but he refused to give up. He honed his skills, learned new techniques and grew stronger with each passing day. He battled giant trolls, fire-breathing dragons, and even the evil sorcerer who had cursed his kingdom.

						Despite all the obstacles, Luke's bravery and determination never wavered. He always found a way to overcome the odds, and with each victory, he grew more confident and powerful. The people of the kingdom began to take notice of the young hero and many started to look up to him for inspiration and hope.

						Eventually, Luke found himself standing face to face with the evil sorcerer who had terrorized the kingdom for so many years. It was the battle of his life, but Luke refused to back down. With all his strength and all the skills he had acquired, Luke defeated the sorcerer and lifted the curse that had befallen his kingdom.

						From that day on, Luke was known as the greatest hero the kingdom had ever seen. He had gone from a weak young boy to a strong and powerful warrior, who had defeated the greatest of monsters and dragons. The kingdom flourished and the people lived in peace and prosperity, all thanks to the bravery of the young hero, Luke.
					</div>
					<Pause isRecording={isRecording} onPlayerClick={clickPlay} style={{ height: '20px', width: '20px' }} />


					<div style={{ display: 'flex', flexDirection: 'column', height: 'auto', width: '50vw', margin: '45px', justifyContent: 'center', alignItems: 'center' }}>
						{isRecording && (<h1 style={{ margin: '0%', fontSize: '1.8vmax', color: '#4A4E69', alignSelf: 'start', justifySelf: 'start' }}>Recording...</h1>)}
						{!isRecording && (<h1 style={{ margin: '0%', fontSize: '1.8vmax', color: '#4A4E69', alignSelf: 'start', justifySelf: 'start' }}>Paused</h1>)}
						<div style={waveformBar}></div>
					</div>
				</div>
				{/* <div style={{display:'sticky',marginTop:'10px',marginBottom:'10px',background:'#4A4E69', height:'30px', width:'100%'}}> </div> */}

			</div><Footer /></>
			);
		};
		
		export default Train;
		