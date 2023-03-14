import React from "react";
import {ReactComponent as Record} from "./About/undraw_recording_re_5xyq.svg";
import {ReactComponent as Collaborators} from "./About/undraw_collaborators_re_hont.svg";
import './About/about.css';
// import Footer from "../../components/Footer";
import logo from "./About/AI17A_generated.jpg"

const About = () => {
	
return (
	<section className="About_main">
		<h1>
			About Mimik
		</h1>
		<div className="block aBlock">
			<h2 className="descriptors">
				Mimik is a free to use Voice Cloning web app developed by students at
				Florida Atlantic University in Boca Raton Florida. 
				It can be used to create audio
				deepfakes, or help you create voiceovers for your videos
			</h2>
			<Collaborators className="Collaborators"></Collaborators>
		</div>
		<div className="block bBlock">
			<img src={logo} alt={"machine learning brain"}></img>

			<h2 className="descriptors">
			Mimik combines neural Speech Recognition and 
			Speech Synthesis technologies in order to create a comprehensive and low latency pipeline. 
			</h2>
		</div>
		<div className="block cBlock">
			<h2 className="descriptors">
				This pipeline lets
				users clone and borrow the voices of others at the click of a button.
			</h2>
			<Record className="Record_svg"/>

		</div>
		{/* <Footer></Footer> */}
	</section>
);
};

export default About;
