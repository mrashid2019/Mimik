import React from "react";
import './About/about.css'
import Icon from "../assets/svgs/undraw_collaborators_re_hont"
import Footer from "../components/Footer"

const About = () => {
	
return (
	<div className="About_main">
		<h1>
			About Mimik
		</h1>
		<div className="aBlock">
			
			<h2 style={{display:'flex', alignContent:'center', flexWrap:'wrap',fontSize:'1vmax', margin:'0', lineHeight:'30px', maxWidth:'300px'}}>
				Mimik is a free to use Voice Cloning web app developed by students at
				Florida Atlantic University in Boca Raton Florida. 
				It can be used to create audio
				deepfakes, or help you create voiceovers for your videos
			</h2>
			<Icon width='30%'height='30%'></Icon>
		</div>
		<div className="bBlock">
			<h2 style={{fontSize:'1em', margin:'0', lineHeight:'30px'}}>
			Mimik combines neural Speech Recognition and 
			Speech Synthesis technologies in order to create a comprehensive pipeline. 
			
			</h2>
		</div>
		<div className="cBlock">
			<h2 style={{fontSize:'1em', margin:'0', lineHeight:'30px'}}>
				This pipeline lets
				users clone and borrow the voices of others.
			</h2>
		</div>
		<Footer></Footer>
	</div>
);
};

export default About;
