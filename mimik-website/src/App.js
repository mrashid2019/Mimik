import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from './components/Navbar';
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

import MainNotification from './components/EmailVerify/MainNotification';
import PhoneAuth from './components/TwoFactor/2-fa';
import { UserAuthContext } from '../src/context/userAuthContext';
import PrivateRoutes from './services/PrivateRoutes';

function App() {
return (
    <UserAuthContext>
    <Loading />
    <Verification />
    <MainNotification />
    <Router>
        <Navbar/>
        <Routes>
            <Route exact path='/' element={<Home />} />
    
            <Route element={<PrivateRoutes />}>
                <Route path='/convert' element={<Convert/>} />
                <Route path='/train' element={<Train/>} />
                <Route path='/profile' element={<ProfilePage/>} />
                <Route path='/logout' element={<LogoutPage/>} />
            </Route>
            
            <Route path='/signup' element={<Signup/>} />
            <Route path='/login' element={<Login />} />
            <Route path='/passwordRecovery' element={<PasswordRecovery/>} />
            <Route path='/2-fa' element={<PhoneAuth/>} />

        </Routes>
    </Router>
    </UserAuthContext>
);
}

export default App;