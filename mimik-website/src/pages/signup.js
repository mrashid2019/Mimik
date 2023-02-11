
import { useState } from "react";
import FormInput from "../components/SignUp/formInput";
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"/>

function SignUp() {

  const[values,setValues] = useState({
    firstname:"",
    lastname:"",
    username:"",
    email:"",
    password:"",
    confirmPassword:"",
  })


    const inputs = [{
      id:1,
      name:"firstname",
      type:"text",
      placeholder:"First Name",
      errorMessage:"Please enter a valied value",
      //label:"Firstname",
      required: true,
    },
    {
      id:2,
      name:"lastname",
      type:"text",
      placeholder:"Last Name",
      errorMessage:"Please enter a valied value",
     // label:"Lastname",
      required: true,

    },
    {
      id: 3,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage:"Username should be 3-16 characters and shouldn't include any special character!",
      //label: "Username",
      pattern:"^[A-Za-z0-9]{3,16}$",
      required: true
    },
    {
      id: 4,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage:"It should be a valid email addres",
      //label: "Email",
      required: true,

    },
    {
      id: 5,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      //label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,

    },
    {
      id: 6,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage:"Passwords don't match",
      //label: "Confirm Password",
      pattern:values.password,
      required: true,
    },
  ];


  const handleSubmit=(e)=>{
    e.preventDefault();

  }

  const onChange = (e) =>{
    setValues({...values,[e.target.name]: e.target.value});
  };

  console.log(values);

  return (
	<div className="signup-form-container">

		<div className="signup-form">
			<div className="signup-form-content ">	
				{/* TITLE  */}
				<h3 className="signup-form-title">Registration</h3>


				<form onSubmit={handleSubmit}>
				{inputs.map(input =>(
				<FormInput 
				key={input.id} 
				{...input} 
				value={values[input.name]}
				onChange={onChange}/>
				))}

				{/* <button>SIGN UP</button> */}

				{/* New button with style */}
				<div className="d-grid gap-2 mt-3 pt-3">
					<button type="submit" className="btn btn-primary signup-btn">
					SIGN UP
					</button>
				</div>
				
				<p>By signing up, you aceept Mimik's privacy policy and <a href={require('../components/SignUp/terms/MIMIKUserAgreement.pdf')} target="_blank">terms of service.</a></p>
				</form>
			</div>
		</div>
	</div>

  );
}

export default SignUp;

