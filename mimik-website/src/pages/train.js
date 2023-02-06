import React, {useState} from 'react';



const main = {
	height:'0vh',
	width:'100vw',
	display:'flex',
	flexDirection:'column',
	justifyContent:'space-between',
	alignItems:'center',
}

const box = {
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
			<div style={{height:'100vh'}}>
			<div style = {main}>
			<h1 style={{margin:'5%', color: '#4A4E69'}}>Train</h1>
			<h1 style={{margin:'0%',fontSize: '1.3vmax', color:'#4A4E69'}}>Press record and begin reading the script at your own pace</h1>
			<div style={box}>
			Consequat labore aliquip consequat consequat eiusmod magna aute pariatur aute nisi. Dolore et deserunt et enim veniam voluptate aute qui in aliquip reprehenderit. Sint occaecat sunt voluptate ipsum nostrud officia.
			
			Irure incididunt sit anim veniam fugiat aliquip est minim labore reprehenderit sit eiusmod non adipisicing. Cillum irure sint quis eiusmod cupidatat eiusmod minim mollit ut qui cillum ea non. Qui labore cupidatat tempor labore tempor exercitation. Nulla magna ea occaecat quis occaecat sunt do enim irure do officia. Dolore irure quis non occaecat adipisicing irure nulla voluptate dolor ipsum ex.
			
			Aliquip duis incididunt dolor qui minim incididunt eu ex in elit tempor. Id aute pariatur ipsum do eiusmod non adipisicing Lorem in commodo voluptate. Id culpa aute do in minim exercitation in. Veniam enim cupidatat magna consequat adipisicing est cupidatat qui aliqua id commodo. Minim sint in elit et aliquip et sunt voluptate mollit. Consectetur officia ut esse officia pariatur aliquip nulla veniam ea.
			
			Aliquip et sint in laboris Lorem labore eu quis occaecat nostrud ad qui ut. Aute voluptate proident commodo sint minim aliquip pariatur eiusmod deserunt enim adipisicing cillum. Deserunt cillum laboris anim do qui cillum sit mollit aliquip dolore. Excepteur aute mollit in consequat aliqua consequat dolore ad in laboris adipisicing. Ea nulla ipsum irure elit cillum. In esse aliquip pariatur dolore fugiat officia mollit qui elit.
			
			Consectetur et mollit quis veniam nulla deserunt voluptate excepteur amet ut consequat dolor enim. Officia irure ut enim anim. Nisi anim anim qui irure elit id mollit ipsum exercitation ad. Ea esse eu velit excepteur laborum labore. Est do tempor sit cupidatat laborum ullamco qui est nulla officia non non ipsum.
			</div>
			<Pause isRecording={isRecording} onPlayerClick={clickPlay} style={{height:'20px', width:'20px'}}/>
			
			
			<div style={{display:'flex', flexDirection:'column', height:'auto', width:'50vw', margin:'45px', justifyContent:'center',alignItems:'center'}}>
			{isRecording &&(<h1 style={{margin:'0%',fontSize: '1.8vmax', color:'#4A4E69', alignSelf:'start', justifySelf:'start'}}>Recording...</h1>)}
			{!isRecording &&(<h1 style={{margin:'0%',fontSize: '1.8vmax', color:'#4A4E69', alignSelf:'start', justifySelf:'start'}}>Paused</h1>)}
			<div style={waveformBar}></div>
			</div>
			</div>
			{/* <div style={{display:'sticky',marginTop:'10px',marginBottom:'10px',background:'#4A4E69', height:'30px', width:'100%'}}> </div> */}

			</div>
			);
		};
		
		export default Train;
		