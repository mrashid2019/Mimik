import React from "react";
import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { Nav, NavBtn, NavBtnLink, NavLink, NavMenu, Hamburger}
	from "./NavbarElements";
import logo from "../Navbar/Mimik-logo.png"
import { useAuth } from "../../context/userAuthContext"


const Navbar = ({nav}) => {
	const [user, setUser] = useState(null);
	const [menuOpen, setMenuOpen] = useState(false);
	const {currentUser , logOut } = useAuth();
	const navigate = useNavigate();

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
		  let loggedOut = await logOut();
		  if(loggedOut === true){
			console.log("LOGGING OUT")
			navigate('/Mimik')
		  }else{
			throw loggedOut
		  }
		} catch (error) {
		  console.log(error.message);
		}
	};

return (
	<>
	<Nav>
		<div style={{color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingRight:'0'}}> <a href="/Mimik" style={{textDecoration: 'none', color:'white',fontSize:'30px'}}>
      <img src={logo} alt='logo' height={80} width={100} />
      MIMIK
    </a></div>
		<Hamburger onClick={() => setMenuOpen(!menuOpen)}>
          <FaBars />
        </Hamburger>
		<NavMenu open={menuOpen}>
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
 
    </>
);
};

export default Navbar;