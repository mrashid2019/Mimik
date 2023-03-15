import React from 'react';
import styled from 'styled-components';


const Button = styled.button`
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
  const hiddenFileInput = React.useRef(null);
  
  const handleClick = event => {
    hiddenFileInput.current.click();
  };
  const handleChange = event => {
    const fileUploaded = event.target.files[0];
    props.handleFile(fileUploaded);
  };
  return (
    <>
      <Button onClick={handleClick}>
        Upload a file
      </Button>
      <input type="file"
             ref={hiddenFileInput}
             onChange={handleChange}
             style={{display:'none'}} 
      />
      <Button>Convert</Button> 
    </>
  );
};
/*export default FileUploader;*/