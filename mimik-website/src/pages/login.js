import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { useAuth } from "../context/userAuthContext";
import { PasswordRecovery } from "../firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn, googleSignIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handlePasswordRecovery = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const result = await PasswordRecovery(email);
      if (result) {
        // Show success message
        setError("Password reset email sent successfully.");
      }
    } catch (error) {
      setError(error.message);
    }
  };


  return (
    <>
      <div className="p-4 box">
        <h2 className="mb-3">Welcome</h2>
        {error && <Alert variant="danger">{error}</Alert>}

        <div>
          <GoogleButton
            className="g-btn"
            type="dark"
            onClick={handleGoogleSignIn}
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
            <Button variant="primary" type="Submit" className="login-btn">
              Log In
            </Button>
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
