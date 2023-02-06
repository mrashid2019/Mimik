import React from "react";
import { Nav, NavLink, NavMenu }
	from "./NavbarElements";

const Navbar = () => {
return (
	<>
	<Nav>
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
		<NavLink to="/login" activeStyle>
			Login
		</NavLink>
		<NavLink to="/signup" activeStyle>
			Sign Up
		</NavLink>
		</NavMenu>
	</Nav>
	</>
);
};

export default Navbar;
