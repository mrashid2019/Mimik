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

&:disabled{
  background: #dfdfdf;
}
`;

export const Button2 = styled.button`
border-radius: 4px;
background: #6969A8;
padding: 10px 22px;
color: #000;
border: none;
outline: none;
cursor: pointer;
transition: all 0.2s ease-in-out;
text-decoration: none;

&:hover {
	transition: all 0.2s ease-in-out;
	background: #6969a8;
	outline-color: #010606;
	color: #fff;
}
`;
export const FileUploader = (props) => {

  const [audioFile, setAudioFile] = useState(undefined);

  const hiddenFileInput = React.useRef(undefined);

  
  const handleClick = event => {
    console.log(props)
    hiddenFileInput.current.click();
    event.target.innerHTML = 'Ready'

  };
    

  const handleChange = event => {
    setAudioFile(event.target.files[0]);
  };

 

  const requestCallback = () =>{
    props.handleFile(audioFile)
  }

  return (
    <>
      <Button onClick={handleClick}>
        Upload a file
      </Button>
      <input type="file"
             ref={hiddenFileInput}
             onInput={handleChange}
             style={{display:'none'}} 
      />

    </>
  );
};
/*export default FileUploader;*/