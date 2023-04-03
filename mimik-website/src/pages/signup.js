import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/userAuthContext'
import '../App.css'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { Box, Modal, Typography, } from '@mui/material'


const Signup = () => {
  const { error, signUp, logIn, currentUser, setLoading } = useAuth();
  const [err, setError] = useState('');
  const [backError, setBackError] = useState('');
  const [signupError, setSignupError] = useState(null);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  // useEffect(() => {
  //   console.log('sign up page loaded');
  //   if (error) {
  //     setError('');
  //     // setBackError(signupError.message);
  //   }
  // }, [signupError, currentUser]);

  const UserHandler = (e) => {
    const { name, value } = e.target;
    // console.log('user state before update', user);
    setUser((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };

   const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, confirmPassword, firstName, lastName, phoneNumber } = user
    setLoading(true);

    if (password == "" || confirmPassword == "" || email == "" || firstName == "" || lastName == "" || phoneNumber == "") {
      setLoading(false);
      setInterval(() => {
        setError("");
      }, 5000)
      return setError("Please fill all the fields")
    } else if (password !== confirmPassword) {
      setLoading(false);
      setInterval(() => {
       setError("")
      }, 5000)
      return setError("Password does not match")
    } else if (password.length < 6) {
      setLoading(false);
      setInterval(() => {
        setError("")
      }, 5000)
      return setError("Password must be greater then 6 character")
    } else if (!phoneNumber.length >= 10) {
      setLoading(false);
      setInterval(() => {
        setError("")
      }, 5000)
      return setError("Phone number must at least 10 digits")
    } else {
      try {
        await signUp(email, password, firstName, lastName, phoneNumber);
        setTimeout(async () => {
          await logIn(email, password);
          setLoading(false);
          setIsSuccessModalOpen(true);
          setModalMessage("Signup successful.");
          setUser({
            firstName: "",
            lastName: "",
            phoneNumber: "",
            email: "",
            password: "",
            confirmPassword: ""
          });
        }, 2000);
      } catch (error) {
        setIsErrorModalOpen(true);
        setModalMessage(`Error: ${error.message}`);
        setLoading(false);
      }
    }
  };

  const handleModalClose = () => {
    setIsSuccessModalOpen(false);
    navigate('/');
  };

  const handleCloseErrorModal = () => {
    setIsErrorModalOpen(false);
  };


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: 'background.paper',
    border: '2px solid #6969A8',
    boxShadow: 24,
    p: 4,
  };

  const errorMessageStyle = {
    backgroundColor: "#f8d7da",
    color: "#842029",
    padding: "10px",
    border: "1px solid ##f8d7da",
    borderRadius: "5px",
    marginTop: "10px",
  };
  


return (
  <div className="box">
       <Box>
      {err ? (
        <Typography variant="subtitle1" style={errorMessageStyle}>{err}</Typography>
      ) : (
        backError && <Typography variant="subtitle1">{backError}</Typography>
      )}
    </Box>

    <form onSubmit={handleSubmit} className="form">
      <h3 className="sign-title">Registration Form</h3>
      {error && <div style={{backgroundColor: "red"}}>{error}</div>}
      <div className="inputfield">
        <input
          type="text"
          placeholder="First Name"
          value={user.firstName}
          name="firstName"
          onChange={UserHandler}
        />
      </div>
      <div className="inputfield">
        <input
          type="text"
          placeholder="Last Name"
          value={user.lastName}
          name="lastName"
          onChange={UserHandler}
        />
      </div>
      <div className="inputfield">
        <input
          type="text"
          placeholder="Email"
          value={user.email}
          name="email"
          onChange={UserHandler}
        />
      </div>

      <div className="inputfield">
        <input
          type="password"
          placeholder="Password"
          value={user.password}
          name="password"
          onChange={UserHandler}
        />
      </div>
      <div className="inputfield">
        <input
          type="password"
          placeholder="Confirm Password"
          value={user.confirmPassword}
          name="confirmPassword"
          onChange={UserHandler}
        />
      </div>
      <div className="inputfield">
        <PhoneInput
          placeholder="+1 (123) 456-7890"
          value={user.phoneNumber}
          name="phoneNumber"
          onChange={(value) =>
            setUser({ ...user, phoneNumber: value })
          }
        />
      </div>
      <div>
        <p>
          By signing up, you accept Mimik's privacy policy and{" "}
          <a
            href={require("../components/SignUp/terms/MIMIKUserAgreement.pdf")}
            target="_blank"
          >
            {" "}
            terms of service.
          </a>
        </p>
      </div>
      <div className="inputfield">
        <input type="submit" class="button-signup" />
      </div>
      <p className="forget">
        Already have an account? <a href="./login">Login </a>
      </p>
    </form>

    <Modal
      open={isSuccessModalOpen}
      onClose={handleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Registration Successful
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Your account has been successfully registered
        </Typography>
      </Box>
    </Modal>
  </div>
);

}

export default Signup;