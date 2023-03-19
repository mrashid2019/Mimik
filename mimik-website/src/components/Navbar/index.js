import React from "react";
import { Nav, NavBtn, NavBtnLink, NavLink, NavMenu, Bars }
	from "./NavbarElements";
import logo from "../Navbar/Mimik-logo.png"



const Navbar = () => {
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