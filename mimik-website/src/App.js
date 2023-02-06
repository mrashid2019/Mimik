import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route}
	from 'react-router-dom';
import Home from './pages';
import About from './pages/about';
import AppTour from './pages/apptour';
import Login from './pages/login';
import Convert from './pages/convert';
import Train from './pages/train';
import SignUp from './pages/signup';

function App() {
return (
	<Router>
	<Navbar />
	<Routes>
		<Route exact path='/' element={<Home />} />
		<Route path='/about' element={<About/>} />
		<Route path='/apptour' element={<AppTour/>} />
		<Route path='/convert' element={<Convert/>} />
		<Route path='/train' element={<Train/>} />
		<Route path='/signup' element={<SignUp/>} />
		<Route path='/login' element={<Login/>} />
	</Routes>
	</Router>
);
}

export default App;
