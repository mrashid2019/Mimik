import React, { useState } from "react";
import { Link, useNavigate, Routes, Route} from "react-router-dom";

import {Button, Form, Alert, Spinner } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { useAuth } from "../context/userAuthContext";


const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false); // new state variable
  const { logIn, googleSignIn, error } = useAuth();
  const [verificationResult, setVerificationResult] = useState(null);


  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError("");
    setLoading(true); // set loading to true when the form is submitted

    if (email.trim() === "" || password.trim() === "") {
      setLoginError("Please enter your email and password.");
      setLoading(false);
      return;
    }
    
    try {
      // Log in the user using email and password
      await logIn(email, password);
      setLoading(false);
      //navigate('/');
    } catch (error) {
      console.log("Firebase error:", error);
      setLoginError(error);
      setLoading(false); // set loading to false after login attempt
      //navigate('/login'); // Redirect to login page on error
    }
  };


  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true); // set loading to true when the Google sign-in button is clicked
    try {
      await googleSignIn();
      setLoading(false);
      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      console.log(error.message);
      setLoading(false); // set loading to false after Google sign-in attempt
    }
  };



  return (
    <>
      <div className="p-4 box">
        <h2 className="mb-3">Welcome!</h2>
        {loginError && <Alert variant="danger">{loginError}</Alert>}  

        <div>
          <GoogleButton
            className="g-btn"
            type="dark"
            onClick={handleGoogleSignIn}
            disabled={loading}
          />
        </div>
        <div>
          <p> OR</p>
        </div>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3 p-2" controlId="formBasicEmail">
            <Form.Control className="info"
              type="email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3 p-2" controlId="formBasicPassword">
            <Form.Control className="info"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <div className="d-grid gap-2 p-3">
            <button className="login-btn" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Log in"}
        </button>
          </div>
        </Form>
        <hr />
        <div className="mt-3 text-center">
       <Link to="/passwordRecovery">Forgot Password?</Link>
      </div>
      <div className="mt-3 text-center">
        New to Mimik? <Link to="/signup">Register Today</Link>
      </div>
    
      </div>
    </>
  );

};

export default Login;
