// import React, {useContext} from "react";
// import { Nav, NavBtn, NavBtnLink, NavLink, NavMenu, Bars }
// 	from "./NavbarElements";
// import logo from "../Navbar/Mimik-logo.png"



// const Navbar = () => {
// 	const { currentUser, logOut } = useContext(AuthContext);
// 	// const navigate = useNavigate();
	

// 	const handleLogout = async () => {
// 		// try {
// 		//   await logOut();
// 		//   navigate("/login");
// 		//   alert("You have successfully logged out")
// 		// } catch (error) {
// 		//   console.log("Failed to log out", error);
// 		// }
// 	  };
	
// return (
// 	<>
// 	<Nav>
// 		<img src={logo} alt='logo' height={100} width= {150}/>
// 		<Bars />
// 		<NavMenu>
// 		<NavLink to="/" activeStyle>
// 			Home
// 		</NavLink>
// 		<NavLink to="/apptour" activeStyle>
// 			App Tour
// 		</NavLink>
// 		<NavLink to="/signup" activeStyle>
// 			Sign Up
// 		</NavLink>
// 		</NavMenu>
// 		<NavBtn>
// 			{currentUser ? (
// 			<li className="dropdown">
// 				<button className="dropbtn">
// 				{currentUser.displayName}
// 				<i className="fa fa-caret-down"></i>
// 				</button>
// 				<div className="dropdown-content">
// 				<NavLink to="/profile">Profile</NavLink>
// 				<button onClick={handleLogout}>Sign Out</button>
// 				</div>
// 			</li>
// 			) : (
//             <NavBtnLink to="/login">Login</NavBtnLink>
//           )}
//         </NavBtn>
// 	</Nav>
// </>
// );
// };

// export default Navbar;
