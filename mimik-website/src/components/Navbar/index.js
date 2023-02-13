import React from "react";
import { Nav, NavBtn, NavBtnLink, NavLink, NavMenu, Bars }
	from "./NavbarElements";
import logo from "../Navbar/Mimik-logo.png"



const Navbar = () => {
return (
	<>
	<Nav>
		<img src={logo} alt='logo' width={150} height={100}/>
		<Bars />
		<NavMenu>
		<NavLink to="/" activeStyle>
			Home
		</NavLink>
		<NavLink to="/apptour" activeStyle>
			App Tour
		</NavLink>
		<NavLink to="/train" activeStyle>
			Train
		</NavLink>
		<NavLink to="/convert" activeStyle>
			Convert
		</NavLink>
		<NavLink to="/signup" activeStyle>
			Sign Up
		</NavLink>
		</NavMenu>
		<NavBtn>
			<NavBtnLink to ="/login">Login</NavBtnLink>
		</NavBtn>
	</Nav>
</>
);
};

export default Navbar;
