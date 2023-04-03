import React, { useState } from 'react';
import styled from 'styled-components';


export const Button = styled.button`
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
`;

export const FileUploader = props => {

  const [contentAudio, setContentAudio] = useState(null);
  const [refAudio, setRefAudio] = useState(null);

  const hiddenFile1Input = React.useRef(null);
  const hiddenFile2Input = React.useRef(null);

  
  const handleClickContent = event => {
    hiddenFile1Input.current.click();
  };
    
  const handleClickReference = event => {
    hiddenFile2Input.current.click();
  };
  const handleContentChange = event => {
    setContentAudio(event.target.files[0]);
    // props.handleFile(fileUploaded);
  };

  const handleReferenceChange = event => {
    setRefAudio(event.target.files[0]);
    // props.handleFile(fileUploaded);
  };

  const requestCallback = () =>{
    props.handleFile(contentAudio, refAudio)
  }

  return (
    <>
      <Button onClick={handleClickContent}>
        Upload a content file
      </Button>
      <input type="file"
             ref={hiddenFile1Input}
             onInput={handleContentChange}
             style={{display:'none'}} 
      />
      <Button onClick={handleClickReference}>
        Upload a reference file
      </Button>
      <input type="file"
             ref={hiddenFile2Input}
             onInput={handleReferenceChange}
             style={{display:'none'}} 
      />
      <Button onClick={requestCallback}>Convert</Button> 
    </>
  );
};
/*export default FileUploader;*/