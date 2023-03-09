import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/userAuthContext'
import '../App.css'

const Signup = () => {
    const { error, signUp, currentuser } = useAuth()
    const [err, setError] = useState("")
    const [backError, setBackError] = useState("")
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
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
        const { email, password, confirmPassword, firstName, lastName } = user
        if (password == "" || confirmPassword == "" || email == "" || firstName == "" || lastName == "") {
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
        else {

            signUp(email, password, confirmPassword, firstName, lastName)
            {
                currentuser && setUser({
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                })
            }
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