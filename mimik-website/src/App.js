import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from './components/Navbar';
//import {Container, Nav, Navbar, Button} from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, Link}
    from 'react-router-dom';
import Loading from './components/Loading';
import Home from './pages';
import About from './pages/about';
import Feature from './pages/#feature';
import Convert from './pages/convert';
import Train from './pages/train';
import Signup from './pages/signup';
import Login from './pages/login';
import Verification from "./components/EmailVerify/verification"
import PasswordRecovery from '../src/components/PasswordRecover/passwordRecovery'
import LogoutPage from './pages/logout';
import ProfilePage from '../src/pages/profile';

import logo from '../src/components/Navbar/Mimik-logo-together.png';

import MainNotification from './components/EmailVerify/MainNotification';
import PhoneAuth from './components/TwoFactor/2-fa';
import { UserAuthContext } from '../src/context/userAuthContext';

function App() {
return (
    <UserAuthContext>
    <Loading />
    <Verification />
    <MainNotification />
    <Router>
        <Navbar/>
    {/* <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
      <Navbar.Brand href="/">
            <img
              alt=""
              src={logo}
              width="100"
              height="100"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Link as={Link} to='/login'>Login</Nav.Link>
            <Nav.Link as={Link} to='/convert'>Convert</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar> */}
        <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/about' element={<About/>} />
            <Route path='/#feature' element={<Feature/>} />
            <Route path='/convert' element={<Convert/>} />
            <Route path='/train' element={<Train/>} />
            <Route path='/signup' element={<Signup/>} />
            <Route path='/login' element={<Login />} />
            <Route path='/passwordRecovery' element={<PasswordRecovery/>} />
            <Route path='/2-fa' element={<PhoneAuth/>} />
            <Route path='/logout' element={<LogoutPage/>} />
            <Route path='/profile' element={<ProfilePage/>} />

        </Routes>
    </Router>
    </UserAuthContext>
);
}

export default App;