import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { Nav, NavBtn, NavBtnLink, NavLink, NavMenu, Bars }
	from "./NavbarElements";
import logo from "../Navbar/Mimik-logo.png"
import { useAuth } from "../../context/userAuthContext"

const Navbar = ({navigate}) => {
	const [user, setUser] = useState(null);
	const {currentUser , logOut } = useAuth();

	useEffect(() => {
		if (currentUser) {
		  // Retrieve the user information from Firebase and store it in the state
		  setUser({ name: currentUser.firstName});
		} else {
		  setUser(null);
		}
	  }, [currentUser]);
	
	  const handleLogout = async () => {
		try {
		  await logOut();
		  navigate('.../pages/logout');
		} catch (error) {
		  console.log(error.message);
		}
	  };

return (
	<>
	<Nav>
		<div style={{color: 'white', fontSize: '30px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}> <a href="/" style={{textDecoration: 'none', color:'white'}}>
      <img src={logo} alt='logo' height={80} width={100} />
      MIMIK
    </a></div>
		<Bars />
		<NavMenu>
		{user && (
			<>
			<NavLink to="/convert">Convert</NavLink>
			<NavLink to="/train">Train</NavLink>
			<NavLink to="/profile">Profile </NavLink>
			</>	
        )}
		{user && (
			<button style={{borderRadius: '4px', background: '#fff', padding: '10px 22px', color: '#4A4E69', border: 'none', outline: 'none', cursor: 'pointer', transition: 'all 0.2s ease-in-out',
				textDecoration: 'none', marginLeft: '24px'}} onClick={handleLogout}>Log Out</button>
        )}
        </NavMenu>
        {!user && (
          <NavBtn>
            <NavBtnLink to="/login">Login</NavBtnLink>
          </NavBtn>
        )}
      </Nav>
	  {/* <nav class="navbar navbar-expand-sm navbar-custom">
  		<div class="container-fluid">
    		<div class="navbar-header">
			<a class="navbar-brand" href="#">
      		<img src={logo} alt="Avatar Logo" style={{width:"40px"}} class="rounded-pill"/> 
    		</a>
    		</div>
    	<ul class="nav navbar-nav">
      		{user && (
       		<li><a href="/profile">Profile</a></li>
      	)}
    	</ul>
    	<ul class="nav navbar-nav navbar-right">
      	{!user && (
        <li><a href="/login">Login</a></li>
      	)}
      	{user && (
        <li><button style={{border:'0px', borderRadius:'10px', width:'fit-content', height:'50px'}} onClick={handleLogout}>Log Out</button></li>
      	)}
    	</ul>
  </div>
		</nav>*/}
 
    </>
);
};

export default Navbar;