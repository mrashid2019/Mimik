import React from "react";
import { Nav, NavBtn, NavBtnLink, NavLink, NavMenu, Bars }
	from "./NavbarElements";
import logo from "../Navbar/Mimik-logo.png"
import { useAuth } from "../../context/userAuthContext";

const Navbar = () => {

	const { currentUser } = useAuth()

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
		{!currentUser && (
			<NavLink to="/signup" activeStyle>
				Sign Up
			</NavLink>
			)}
		</NavMenu>
		
		<NavBtn>
			{currentUser ? (
				<NavBtnLink to="#">{currentUser.firstName} {currentUser.lastName}</NavBtnLink>
				) : (
					<NavBtnLink to="/login">Login</NavBtnLink>
					)}
				</NavBtn>
	</Nav>
</>
);
};

export default Navbar;
