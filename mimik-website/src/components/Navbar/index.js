import React from "react";
import { Nav, NavBtn, NavBtnLink, NavLink, NavMenu, Bars }
	from "./NavbarElements";
import logo from "../Navbar/Mimik-logo.svg"
/*import 'bootstrap/dist/css/bootstrap.css';*/

const Navbar = () => {
  return (
      <>
      <Nav>
          <img src={logo} alt='logo' height={120} width= {200}/>
          <Bars />
          <NavMenu>
          <NavLink to="/" activeStyle>
              Home
          </NavLink>
          <NavLink to="/#feature" activeStyle>
              Features
          </NavLink>
          <NavLink to="/signup" activeStyle>
              Sign Up
          </NavLink>
          <NavBtn>
              <NavBtnLink to ="/login">Login</NavBtnLink>
          </NavBtn>
          </NavMenu>
      </Nav>
  </>
  );
  };

  export default Navbar;