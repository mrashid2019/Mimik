import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/userAuthContext'
import '../App.css'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'


const Signup = () => {
    const { error, signUp, currentuser } = useAuth()
    const [err, setError] = useState("")
    const [backError, setBackError] = useState("")
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    useEffect(() => {
        console.log("sign up page loaded")
        if (error) {
            setInterval(() => {
                setBackError("")
            }, 5000)
            setBackError(error)
        }
    }, [error, currentuser])
    const UserHandler = (e) => {
        const { name, value } = e.target;
        setUser((pre) => {
            return {
                ...pre,
                [name]: value
            }
        })
    }


    const SubmitHandler = async (e) => {
        e.preventDefault()
        const { email, password, confirmPassword, firstName, lastName, phoneNumber } = user
        if (password == "" || confirmPassword == "" || email == "" || firstName == "" || lastName == "" || phoneNumber == "") {
            setInterval(() => {
                setError("")
            }, 5000)
            return setError("Please fill all the field ")
        }
        else if (password !== confirmPassword) {
            setInterval(() => {
                setError("")
            }, 5000)
            return setError("Password does not match")
        }
        else if (!password.length >= 6 || !confirmPassword.length >= 6) {
            setInterval(() => {
                setError("")
            }, 5000)
            return setError("Password must be greater then 6 character")
        }
        else if(!phoneNumber.length >= 10) {
            setInterval(() => {
                setError("")
            }, 5000)
            return setError("Phone number must at least 10 digits")
        }
        else {
            signUp(email, password, confirmPassword, firstName, lastName, phoneNumber)
            {
                currentuser && setUser({
                    firstName: "",
                    lastName: "",
                    phoneNumber: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                })
            }
            console.log('email: ', {email});
            console.log('firstname: ', {firstName});
            console.log('lastName: ', {lastName});
            console.log('phoneNumber: ', {phoneNumber});
            alert("Sign up successful");
        }
    }
    return (
        <div className='box'>
            {
                err ? (
                    err && <p className='error'>{err}</p>
                ) : (
                    backError && <p className='error'>{backError}</p>
                )
            }

            <form onSubmit={SubmitHandler} className="form">
                <h3 className="signup-form-title">Registration Form</h3>
                <div className="inputfield">
                    <input type="text" 
                            placeholder="First Name" 
                            value={user.firstName} 
                            name='firstName' 
                            onChange={UserHandler} />
                </div>
                <div className="inputfield">
                    <input type="text" 
                            placeholder="Last Name" 
                            value={user.lastName} 
                            name='lastName' 
                            onChange={UserHandler}
                    />
                </div>
                <div className="inputfield">
                    <input type="text" 
                            placeholder="Email" 
                            value={user.email} 
                            name='email' 
                            onChange={UserHandler} 
                    />
                </div>

                <div className="inputfield">
                    <input type="password" 
                            placeholder="Password"
                            value={user.password} 
                            name='password' 
                            onChange={UserHandler} 
                    />
                </div>
                <div className="inputfield">
                    <input type="password" 
                            placeholder="Confirm Password" 
                            value={user.confirmPassword} 
                            name='confirmPassword' 
                            onChange={UserHandler} 
                    />
                </div>
                <div className="inputfield">
                <PhoneInput 
                            placeholder="+1 (123) 456-7890"
                            value={user.phoneNumber}
                            name="phoneNumber"
                            onChange={(value) => setUser({ ...user, phoneNumber: value })}
                            // onChange={UserHandler} 
                    />
                </div>
                <div> 
                    <p>By signing up, you accept Mimik's privacy policy and 
                        <a href={require('../components/SignUp/terms/MIMIKUserAgreement.pdf')} target="_blank"> terms of service.</a>
                    </p>
                </div>
                <div className="inputfield">
                    <input type="submit" />
                </div>
                <p className="forget">Already have an account? <a href="./login">Login </a></p>
            </form>

        </div>
    )
}

export default Signup