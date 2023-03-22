import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
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
		<img src={logo} alt='logo' height={100} width= {150}/>
		<Bars />
		<NavMenu>
		<NavLink to="/" activeStyle>
			Home
		</NavLink>
		<NavLink to="/apptour" activeStyle>
			App Tour
		</NavLink>
		{user && (
			<NavLink to="/profile">Profile </NavLink>	

        )}
		{user && (
			<button style={{border:'0px', borderRadius:'10px', width:'fit-content', height:'50px'}} onClick={handleLogout}>Log Out</button>
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