import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Home from './pages';
import About from './pages/about';
import Feature from './pages/#feature';
import Convert from './pages/convert';
import Train from './pages/train';
import SignUp from './pages/signup';
import Login from './pages/login';
import LogoutPage from './pages/logout';
import { UserAuthContext } from '../src/context/userAuthContext';

function App() {
return (
    <UserAuthContext>
    <Router>
        <Navbar />
        <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/about' element={<About/>} />
            <Route path='/#feature' element={<Feature/>} />
            <Route path='/convert' element={<Convert/>} />
            <Route path='/train' element={<Train/>} />
            <Route path='/signup' element={<SignUp/>} />
            <Route path='/login/*' element={<Login/>} />
            <Route path='/logout' element={<LogoutPage/>} />
        </Routes>
    </Router>
    </UserAuthContext>
);
}

export default App;