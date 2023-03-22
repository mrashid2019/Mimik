import { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useAuth } from "../../components/context/userAuthContext";

const PasswordRecovery = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const { forgotPassword } = useAuth();;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        try {
          await forgotPassword(email); 
          setSuccess(
            "A password reset email has been sent to your email address. Please check your inbox and follow the instructions to reset your password."
          );
        } catch (err) {
          setError(err.message);
        }
    };
    return (
        <>
          <div className="p-4 box">
            <h2 className="mb-3">Password Recovery</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3 p-2" controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  placeholder="Email address"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <div className="d-grid gap-2 p-3">
                <Button variant="primary" type="Submit" className="login-btn">
                  Send Password Reset Email
                </Button>
              </div>
            </Form>
            <hr />
            <div className="mt-3 text-center">
              Remembered your password? <Link to="/login">Log In</Link>
            </div>
          </div>
        </>
    );
};
export default PasswordRecovery;