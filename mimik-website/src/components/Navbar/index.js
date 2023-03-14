import React from "react";
import { Nav, NavBtn, NavBtnLink, NavLink, NavMenu, Bars }
	from "./NavbarElements";
import logo from "../Navbar/Mimik-logo.png"
import { AuthContext } from "../../context/userAuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
	const { currentUser, logOut } = useContext(AuthContext);
	const navigate = useNavigate();
	

	const handleLogout = async () => {
		try {
		  await logout();
		  navigate("/login");
		  alert("You have successfully logged out")
		} catch (error) {
		  console.log("Failed to log out", error);
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
		</NavMenu>
		
		<NavBtn>
			{currentUser ? (
			<li className="dropdown">
				<button className="dropbtn">
				{currentUser.displayName}
				<i className="fa fa-caret-down"></i>
				</button>
				<div className="dropdown-content">
				<Link to="/profile">Profile</Link>
				<button onClick={logOut}>Sign Out</button>
				</div>
			</li>
			) : (
            <NavBtnLink to="/login">Login</NavBtnLink>
          )}
        </NavBtn>
	</Nav>
</>
);
};

export default Navbar;
