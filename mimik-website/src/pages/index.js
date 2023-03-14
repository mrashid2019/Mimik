import React from 'react';
import { Link } from 'react-router-dom';
import chart from "./home-page-charts-transparent.png"


const Home = () => {
return (
	<>
	<div style={{textAlign: 'center', fontWeight: 'lighter', fontSize: 25, marginTop: 30}}>
		<p>Mimik allows you to alter your speech such that it mimics the voice of another person. Choose to either model your voice or change yours to sound like someone else!</p>
	</div>
	<div className='image-container'><img src={chart} alt='home-page-charts'/></div>
	<div style={{textAlign: 'center', fontWeight: 'lighter', fontSize: 30, marginTop: 80}}>
		<p style={{color: '#303978'}}>TRY IT OUT FOR FREE</p>
		<p>Choose convert to change your voice or train to model your voice and add to the dataset.</p>
	</div>
	<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
		<Link to="/train"><button className='round-button' style={{marginRight: '30px'}}>Train</button></Link>
		<Link to="/convert"><button className='round-button' style={{marginLeft: '30px'}}>Convert</button></Link>
	</div>
	<div style={{textAlign: 'center', fontWeight: 'lighter', fontSize: 30, marginTop: 80, color: '#303978'}}>
		<p>UNSURE OF HOW TO BEGIN?<br />
		WATCH THE TOUR</p>
	</div>
	<div style={{background: '#f1f1f1', padding: '200px', border: '5px solid #ccc', marginLeft: 50, marginRight: 50, marginBottom: 50}}></div> 
	</>
);
};

export default Home;
