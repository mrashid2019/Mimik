import React from "react";
import "../Footer/footer.css"
import logo from "../Navbar/Mimik-logo.svg"


function Footer(){
    return(
        <div className="main-footer">

            <div className="row">
            <div class="col-sm-8 p-3 text-white">
                
                <img className="footer_img" src={logo} />
                
                </div>

                 <div class="col-sm-4 p-3 text-white">
                 <div class="row">
                    <div class="col-sm-3">About</div>
                    <div class="col-sm-3">Contact</div>
                    <div class="col-sm-3"><a class="footer_link" href="https://github.com/wdure2018/Mimik" target="_blank">GitHub</a></div>
                    <div class="col-sm-3">FAQs</div>
                    </div>                
                </div>
            </div>

                <div className="row">
                    <hr/>
                    <p className="col-sm">
                        &copy;{new Date().getFullYear()} Mimik | All rights Reserved | <a class="terms" href={require('../SignUp/terms/MIMIKUserAgreement.pdf')} target="_blank"> Terms of Service</a> 
                    </p>
                </div>
            </div>
    )
}

export default Footer;