import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";


export const Nav = styled.nav`
background: #6969A8;
height: 85px;
display: flex;
justify-content: space-between;
padding: 0.2rem calc((100vw - 1000px) / 2);
z-index: 12;
`

export const NavLink = styled(Link)`
color: #FFFFFF;
display: flex;
align-items: right;
text-decoration: none;
padding: 0 1rem;
height: 100%;
margin-top: 60px;
cursor: pointer;
 

&:hover {
	color: darkblue;
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
	font-size: 1.8rem;
	cursor: pointer;
}
`

export const NavMenu = styled.div`
display: flex;
align-items: center;
/*margin-right: -24px;*/
/* Second Nav */
margin-right: 24px; 
/* Third Nav */
/* width: 100vw;
white-space: nowrap; */
@media screen and (max-width: 768px) {
	display: none;
}
`;

export const NavBtn = styled.div`
display: flex;
align-items: center;
margin-right: 24px;
@media screen and (max-width: 768px) {
	display: none;
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

&:hover {
	transition: all 0.2s ease-in-out;
	background: #737894;
	outline-color: #010606;
	color: #000;
}
`
