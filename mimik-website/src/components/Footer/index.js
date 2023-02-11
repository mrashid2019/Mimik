import React from "react";
import "../Footer/footer.css"
 

function Footer(){
    return(
        <div className="main-footer">

            <div className="row">
            <div class="col-sm-8 p-3 text-white">
                
                <img className="footer_img" src={require('../Footer/mimik_logo.png')} />
                
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
                        &copy;{new Date().getFullYear()} Mimik | All rights Reserved | terms of service 
                    </p>
                </div>
            </div>
    )
}

export default Footer;