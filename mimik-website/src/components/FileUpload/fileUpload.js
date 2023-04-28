import React, { useRef } from 'react';
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
  background: #dfdfdf;
  outline-color: #010606;
	color: #fff;

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
  const hiddenFileInput = useRef();

  const handleClick = (e)=>{
    hiddenFileInput.current.click();
  }

  const handleChange = (e)=>{
    // console.log(e.target, hiddenFileInput.current);
    props.handler(e, props.id)
  }
  return (
    <>
      <Button onClick={handleClick}>
        Upload a file
      </Button>
      <input type="file"
             ref={hiddenFileInput}
             onInput={e=>handleChange(e)}
             style={{display:'none'}} 
      />

    </>
  );
};
/*export default FileUploader;*/