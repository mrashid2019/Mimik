import React, { useState, useEffect } from 'react';
import styled from 'styled-components';


export const Button = styled.button.attrs(props=>({
  disabled: props.disabled
}))`
border-radius: 4px;
background: #6969A8;
padding: 10px 22px;
color: #000;
border: none;
outline: none;
cursor: pointer;
transition: all 0.2s ease-in-out;
text-decoration: none;

margin-left: 24px;

&:hover {
	transition: all 0.2s ease-in-out;
	background: #6969a8;
	outline-color: #010606;
	color: #fff;
}

&:disabled{
  background: gray;
  outline-color: #010606;
	color: #fff;
}
`;

export const FileUploader = props => {

  const [contentAudio, setContentAudio] = useState(null);
  const [refAudio, setRefAudio] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const hiddenFile1Input = React.useRef(null);
  const hiddenFile2Input = React.useRef(null);

  useEffect(()=>{
    setButtonDisabled(!(contentAudio && refAudio))
  },[contentAudio, refAudio])
  
  const handleClickContent = async (event) => {
    hiddenFile1Input.current.click();
    // event.target.innerHTML = 'Content ready'

  };
    
  const handleClickReference = async (event) => {
    hiddenFile2Input.current.click();
    // event.target.innerHTML = 'Reference ready'

  };

  const handleContentChange = event => {
    setContentAudio(event.target.files[0]);
    document.getElementById('content_btn').innerHTML = 'Content ready'
    // props.handleFile(fileUploaded);
  };

  const handleReferenceChange = event => {
    setRefAudio(event.target.files[0]);
    document.getElementById('reference_btn').innerHTML = 'Reference ready'

    // props.handleFile(fileUploaded);
  };

  const requestCallback = () =>{
    props.handleFile(contentAudio, refAudio)
  }

  return (
    <>
      <Button id="content_btn" onClick={handleClickContent}>
        Upload a content file
      </Button>
      <input type="file"
             ref={hiddenFile1Input}
             onInput={handleContentChange}
             style={{display:'none'}} 
      />
      <Button id="reference_btn" onClick={handleClickReference}>
        Upload a reference file
      </Button>
      <input type="file"
             ref={hiddenFile2Input}
             onInput={handleReferenceChange}
             style={{display:'none'}} 
      />
      <Button onClick={requestCallback} disabled={buttonDisabled} >Convert</Button> 
    </>
  );
};
/*export default FileUploader;*/