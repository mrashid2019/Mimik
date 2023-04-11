import { React, useState }from 'react';
import { Link } from 'react-router-dom';
import chart from "./home-page-charts-transparent.png"
import Carousel from 'react-bootstrap/Carousel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { MDBAccordion, MDBAccordionItem, MDBContainer } from "mdb-react-ui-kit";
import Footer from "../../src/components/Footer";
import "../pages/background.css";

import bolt from './/key-feature-icons/bolt.svg';
import coins from './/key-feature-icons/coins.svg';
import clone from './/key-feature-icons/clone.svg'
import glass from './/key-feature-icons/magnifying-glass.svg'

import logo from './head-background.jpg'

import adrian_audio1 from './audio/Before_Adrian03.m4a'
import adrian_audio2 from './audio/AdrianToMahdia.wav'

import mahdia_audio1 from './audio/Before_Mahdia01.m4a'
import mahdia_audio2 from './audio/MahdiaToAdrian.wav'

import wilmayer_audio1 from './audio/AdrianToWilmayer.wav'

import wilmayer_audio2 from './audio/Wilmayer_to_Mahdia.wav'
import wilmayer_audio3 from './audio/Wilmayer_Before.wav'



const Home = () => {
return (
	<>
	{/* <div className='head-image'>
		<p style={{fontSize: 60, color: '#FFF', fontWeight: 'lighter', textAlign: 'center', paddingRight: 700, paddingTop: 50,fontFamily: 'IM Fell Double Pica'}}>Voice Cloning at the Palm<br/> of Your Hands</p>
		<p style={{fontSize: 25, color: '#FFF', fontWeight: 'lighter', textAlign: 'center', paddingRight: 700, paddingBottom: 40, fontFamily: 'IM Fell Double Pica'}}>Transform your voice to sound<br/> like your favorite celebrity <br/>or even your friend!</p>
  </div> */}
  <section>
    <div className='left-side'>
    <p style={{fontSize: 50, color: '#FFF', fontWeight: 'lighter', textAlign: 'center'}}>Voice Cloning at the Palm<br/> of Your Hands</p>
		<p style={{fontSize: 20, color: '#FFF', fontWeight: 'lighter', textAlign: 'center'}}>Transform your voice to sound<br/> like your favorite celebrity <br/>or even your friend!</p>
    </div>
    <div className='right-side'>
    <Carousel style={{padding: 100}}>
      <Carousel.Item interval={3000}>
      <div style={{textAlign: 'center', color: 'white', paddingBottom: 60, fontSize: 20}}>Listen to Adrian sound like Mahdia!</div>
      <div style={{paddingLeft: 100, paddingRight: 100}}>
      <div style={{display: "flex"}}>
      <div style={{flex: 1, marginRight: 20}}>
        <audio controls className="carousel-audio">
          <source src={adrian_audio1} type="audio/mp4" />
        </audio>
        <p style={{textAlign: 'center'}}>Before</p>
      </div>
      <div style={{flex: 1}}>
        <audio controls className="carousel-audio">
          <source src={adrian_audio2} type="audio/mp4" />
        </audio>
        <p style={{textAlign: 'center'}}>After</p>
      </div>
      </div>
      </div>
      </Carousel.Item>
      <Carousel.Item interval={3000}>
      <div style={{textAlign: 'center', color: 'white', paddingBottom: 60, fontSize: 20}}>Listen to Mahdia sound like Adrian!</div>
      <div style={{paddingLeft: 100, paddingRight: 100}}>
      <div style={{display: "flex"}}>
      <div style={{flex: 1, marginRight: 20}}>
        <audio controls className="carousel-audio">
          <source src={mahdia_audio1} type="audio/mp4" />
        </audio>
        <p style={{textAlign: 'center'}}>Before</p>
      </div>
      <div style={{flex: 1}}>
        <audio controls className="carousel-audio">
          <source src={mahdia_audio2} type="audio/mp4" />
        </audio>
        <p style={{textAlign: 'center'}}>After</p>
      </div>
      </div>
      </div>
      </Carousel.Item>
      </Carousel>
    </div>
  <div class='air air1'></div>
  <div class='air air2'></div>
  <div class='air air3'></div>
  <div class='air air4'></div>
  </section>


 <div style={{backgroundColor: '#FFF', filter: 'drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.5))'}}>
	<div style={{textAlign: 'center', fontSize: 30, /*paddingTop: 50,*/}}>
		<p>Mimik allows you to alter your speech such that it mimics the voice of <br/>another person. Choose to either model your voice or change yours<br/> to sound like someone else!</p>
	</div>
	<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: 50}}>
    <Link to="/login"><button className='round-button' style={{}}>Try it now!</button></Link>
		{/* <Link to="/train"><button className='round-button' style={{marginRight: '30px'}}>Train</button></Link>
		<Link to="/convert"><button className='round-button' style={{marginLeft: '30px'}}>Convert</button></Link> */}
	</div>
  </div>
	

  <div className='background' style={{display: 'flex', flexDirection: 'column', alignItems: 'center', filter: 'drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.5))'}}>
  <div style={{fontSize: 30, color: '#303978', textAlign: 'center', paddingTop: 30, paddingBottom: 40, fontFamily: 'IM Fell Double Pica'}}>ABOUT MIMIK</div>
  <div className='image-container' style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
    <img src={chart} alt='home-page-charts'/>
    <p style={{padding: '20px', textAlign: 'center', fontSize: '20px'}}>Mimik is a free to use Voice Cloning web app developed by students at Florida Atlantic University in Boca Raton, Florida. It can be used to create audio deepfakes, or help you create voiceovers for your videos. Mimik combines neural Speech Recognition and Speech Synthesis technologies in order to create a comprehensive and low latency pipeline. This pipeline lets users clone and borrow the voices of others at the click of a button.</p>
  </div>
</div>


	{/* <div className='background'>
	<div style={{fontSize: 30, color: '#303978', textAlign: 'center', paddingTop: 30, paddingBottom: 40, fontFamily: 'IM Fell Double Pica'}}>ABOUT MIMIK</div>
	<div className='image-container'>
		<p style={{paddingLeft: 20, paddingRight: 20}}>Mimik is a free to use Voice Cloning web app developed by students at 
        Florida Atlantic University in Boca Raton Florida. 
				It can be used to create audio
				deepfakes, or help you create voiceovers for your videos. Mimik combines neural Speech Recognition and 
			  Speech Synthesis technologies in order to create a comprehensive and low latency pipeline. This pipeline lets
				users clone and borrow the voices of others at the click of a button.</p>
		<img src={chart} alt='home-page-charts'/>
	</div>
	</div> */}
	<div id="feature" target="_self" style={{fontSize: 30, color: '#303978', textAlign: 'center', paddingTop: 40}}>KEY FEATURES</div>
	<Row style={{textAlign: 'center', padding: 150, fontFamily: 'IM Fell Double Pica'}}>
		<Col><img src={bolt} alt='bolt' style={{height:100, width:150, paddingBottom: 20}}/><h5>FAST & EASY</h5><p>Convert your voice with minimal processing delay</p></Col>
		<Col><img src={coins} alt='free' style={{height:100, width:150, paddingBottom: 20}}/><h5>FREE</h5><p>Connect on Mimik at no cost</p></Col>
		<Col><img src={clone} alt='free' style={{height:100, width:150, paddingBottom: 20}}/><h5>CLONE & SHARE</h5><p>Share your cloned sample with anyone at any time</p></Col>
		<Col><img src={glass} alt='search' style={{height:100, width:150, paddingBottom: 20}}/><h5>ADVANCE SEARCH</h5>Look for that one voice you really want to sound like</Col>
	</Row>

	<div className='background' style={{filter: 'drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.5))'}}>
	<div style={{fontSize: 30, color: '#303978', textAlign: 'center', paddingTop: 30,fontFamily: 'IM Fell Double Pica'}}>MODEL EXAMPLES</div>
    <Carousel style={{padding: 100}}>
      <Carousel.Item interval={3000}>
      <div style={{textAlign: 'center', color: '#303978', paddingBottom: 60, fontSize: 20}}>Check out Adrian sounding like Mahdia!</div>
      <div style={{paddingLeft: 100, paddingRight: 100}}>
      <div style={{display: "flex"}}>
      <div style={{flex: 1, marginRight: 20}}>
        <audio controls style={{width: "100%"}}>
          <source src={adrian_audio1} type="audio/mp4" />
        </audio>
        <p style={{textAlign: 'center'}}>Before</p>
      </div>
      <div style={{flex: 1}}>
        <audio controls style={{width: "100%"}}>
          <source src={adrian_audio2} type="audio/mp4" />
        </audio>
        <p style={{textAlign: 'center'}}>After</p>
      </div>
      </div>
      </div>
      {/* <Carousel.Caption style={{paddingTop: 700, color: '#fff'}}>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item interval={3000}>
      <div style={{textAlign: 'center', color: '#303978', paddingBottom: 60, fontSize: 20}}>Check out Mahdia sounding like Adrian!</div>
      <div style={{paddingLeft: 100, paddingRight: 100}}>
      <div style={{display: "flex"}}>
      <div style={{flex: 1, marginRight: 20}}>
        <audio controls style={{width: "100%"}}>
          <source src={mahdia_audio1} type="audio/mp4" />
        </audio>
        <p style={{textAlign: 'center'}}>Before</p>
      </div>
      <div style={{flex: 1}}>
        <audio controls style={{width: "100%"}}>
          <source src={mahdia_audio2} type="audio/mp4" />
        </audio>
        <p style={{textAlign: 'center'}}>After</p>
      </div>
      </div>
      </div>
        {/* <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item interval={3000}>
      <div style={{textAlign: 'center', color: '#303978', paddingBottom: 60, fontSize: 20}}>Check out Adrian sounding like Wilmayer!</div>
      <div style={{paddingLeft: 100, paddingRight: 100}}>
      <div style={{display: "flex"}}>
      <div style={{flex: 1, marginRight: 20}}>
        <audio controls style={{width: "100%"}}>
          <source src={adrian_audio1} type="audio/mp4" />
        </audio>
        <p style={{textAlign: 'center'}}>Before</p>
      </div>
      <div style={{flex: 1}}>
        <audio controls style={{width: "100%"}}>
          <source src={wilmayer_audio1} type="audio/mp4" />
        </audio>
        <p style={{textAlign: 'center'}}>After</p>
      </div>
      </div>
      </div>
      </Carousel.Item>
      <Carousel.Item interval={3000}>
      <div style={{textAlign: 'center', color: '#303978', paddingBottom: 60, fontSize: 20}}>Check out Wilmayer sounding like Mahdia!</div>
      <div style={{paddingLeft: 100, paddingRight: 100}}>
      <div style={{display: "flex"}}>
      <div style={{flex: 1, marginRight: 20}}>
        <audio controls style={{width: "100%"}}>
          <source src={wilmayer_audio3} type="audio/mp4" />
        </audio>
        <p style={{textAlign: 'center'}}>Before</p>
      </div>
      <div style={{flex: 1}}>
        <audio controls style={{width: "100%"}}>
          <source src={wilmayer_audio2} type="audio/mp4" />
        </audio>
        <p style={{textAlign: 'center'}}>After</p>
      </div>
      </div>
      </div>
      </Carousel.Item>
    </Carousel>
	</div>

	<div style={{fontSize: 30, color: '#303978', textAlign: 'center', paddingTop: 40}}>FREQUENTLY ASKED QUESTIONS</div>
	<MDBContainer className="mt-5" style={{maxWidth: '1000px', paddingBottom: 50}}>
    <MDBAccordion alwaysOpen initialActive={3}>

        <MDBAccordionItem collapseId={1} headerTitle="Is Mimik free to use?">
          <strong>Yes, Mimik is completely free of charge. You won't be asked to pay at any point.</strong> 
        </MDBAccordionItem>

        <MDBAccordionItem collapseId={2} headerTitle="How does Mimik work?">
          <strong>You will first have to create an account. Once you do, you can head on to the <code>Train</code> tab to record
            and save your voice if you wish to do so. Otherwise, the <code>Convert</code> tab will allow you to select a voice you'd like
            to sound like from the dataset and record the sample you'd like to be cloned. It will provide you with a transformed
            voice sample after.
          </strong>
        </MDBAccordionItem>

        <MDBAccordionItem collapseId={3} headerTitle="Do I need to create an account to use Mimik?">
          <strong>Yes, to perform any sort of conversion, you would need to create an account.</strong>
        </MDBAccordionItem>

        <MDBAccordionItem collapseId={4} headerTitle="What kind of voice can be changed with Mimik?">
          <strong>Any kind of voice can be changed. For cloning purposes, you can either record your own voice for others
            to transform their voice into or select one from the various datasets provided. 
          </strong>
        </MDBAccordionItem>

    </MDBAccordion>
  </MDBContainer>
<Footer/>
</>
);
};

export default Home;
