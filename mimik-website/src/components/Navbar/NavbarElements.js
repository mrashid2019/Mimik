import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";


export const Nav = styled.nav`
font-size: 1.2rem;
position: sticky;
top: 0;
z-index: 10;
background: #6969A8;
height: 85px;
display: flex;
justify-content: space-between;
padding: 0.2rem calc((100vw - 1000px) / 2);
z-index: 12;
filter: drop-shadow(10px);
`

export const NavLink = styled(Link)`
color: #FFFFFF;
display: flex;
align-items: right;
text-decoration: none;
padding: 0 1rem;
height: 100%;
margin-top: 40px;
cursor: pointer;
 
&:hover {
	color: black;
}
`

export const Bars = styled(FaBars)`
display: none;
color: #fff;
@media screen and (max-width: 768px) {
	display: block;
	position: absolute;
	top: 0;
	right: 0;
	transform: translate(-100%, 75%);
	font-size: 5rem !important;
	cursor: pointer;
}
`

export const NavMenu = styled.div`
display: flex;
align-items: center;
justify-content: center;
@media (max-width: 768px) {
  flex-direction: column;
  position: fixed;
  top: 80px;
  left: ${({ open }) => (open ? "0" : "-100%")};
  opacity: 1;
  transition: height 0.3s ease-in-out;
  background-color: rgb(105 105 167);
  width: 100%;
  height: 40vh;
`;

export const NavBtn = styled.div`
display: flex;
align-items: center;
margin-right: 24px;
@media screen and (max-width: 768px) {
	display: none;
	margin-bottom: 25px;
	margin-top: 20px;
}
}
`

export const NavBtnLink = styled(Link)`
border-radius: 4px;
background: #fff;
padding: 10px 22px;
color: #4A4E69;
border: none;
outline: none;
cursor: pointer;
transition: all 0.2s ease-in-out;
text-decoration: none;
margin-left: 24px;

@media screen and (max-width: 768px) {
	margin-bottom: 20px;
    margin-top: 30px;
}

&:hover {
	transition: all 0.2s ease-in-out;
	background: #737894;
	outline-color: #010606;
	color: #000;
}
`




export const LogoWrapper = styled.div`
  margin-left: 20px;
  font-size: 1.5rem;
`;

export const Hamburger = styled.div`
  display: none;
  color:white;
  font-size:2rem;
  cursor: pointer;
  margin-right: 20px;
  @media (max-width: 768px) {
    display: block;
  }
`;
