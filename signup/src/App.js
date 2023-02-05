
import { useState } from "react";
import "./App.css"
import FormInput from "./components/formInput";

function App() {

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
      label:"Firstname",
      required: true,
    },
    {
      id:2,
      name:"lastname",
      type:"text",
      placeholder:"Last Name",
      errorMessage:"Please enter a valied value",
      label:"Lastname",
      required: true,

    },
    {
      id: 3,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage:"Username should be 3-16 characters and shouldn't include any special character!",
      label: "Username",
      pattern:"^[A-Za-z0-9]{3,16}$",
      required: true
    },
    {
      id: 4,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage:"It should be a valid email addres",
      label: "Email",
      required: true,

    },
    {
      id: 5,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,

    },
    {
      id: 6,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage:"Passwords don't match",
      label: "Confirm Password",
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
    <div className="App">

      
      <form onSubmit={handleSubmit}>
        {inputs.map(input =>(
        <FormInput 
        key={input.id} 
        {...input} 
        value={values[input.name]}
        onChange={onChange}/>
        ))}
        <button>SIGN UP</button>
        
        <p>By signing up, you aceept Mimik's privacy policy and <a href="https://drive.google.com/file/d/1KOu6CPQsmvR-gWBsGK85KRJn65RXXcDB/view?usp=sharing" target={"_blank"}>terms of service</a></p>
         </form>
    </div>
  );
}

export default App;
