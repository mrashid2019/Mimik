import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import Footer from "../../components/Footer";

import OtpInput from "otp-input-react";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth} from "../../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

export default function PhoneAuth() {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);
  // const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  function onCaptchaVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  }

  // function getPhoneNumberFromUserInput() {
  //   return document.getElementById('phone-number').value;
  // }

  function onSignup() {
    setLoading(true);
    onCaptchaVerify();
    // const phoneNumber = getPhoneNumberFromUserInput();
    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+" + ph;

    if (formatPh === "+") {
      // Skip verification and go to homepage
      setLoading(false);
      navigate('./Mimik');
      return;
    }

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sent successfully!");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setUser(res.user);
        setLoading(false);
        navigate('./')
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  return (
    <>
    <section style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "80vh",
      backgroundColor: "#ffffff",
    }}>
      <div style={{ border: "1px solid #dfdfdf", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", borderRadius: "5%"}}>
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>
        {user ? (
          console.log("logged in")
        ) : (
          <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
            <h1 className="text-center leading-normal text-black font-medium mb-6" style={{fontSize:"40px", padding:"20px"}}>
              Set up two-factor for <br /> Mimik 
            </h1>
            {showOTP ? (
              <>
                <div style={{ display: "flex", alignItems: "center", marginBottom: "2%" }}>
                  <BsFillShieldLockFill size={30} />
                <label
                  htmlFor="otp"
                  className="font-bold text-xl text-black ml-2 text-center"
                >
                  Enter your OTP
                </label>
                </div>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus
                  className="opt-container "
                ></OtpInput>
                <button
                  onClick={onOTPVerify}
                  className="flex gap-1 items-center justify-center py-2.5 mt-3 text-white login-btn"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Verify OTP</span>
                </button>
              </>
            ) : (
              <>
               <div style={{ display: "flex", alignItems: "center", marginBottom: "2%" }}>
                <BsTelephoneFill size={30} />
                  <label
                  htmlFor=""
                  className="font-bold text-xl text-black text-center"
                  style={{ marginLeft: "10px" }}
                   >
                    Verify your phone number
                  </label>

                </div>
                <PhoneInput id={"phone-number"} country={"us"} value={ph} onChange={setPh} />
                <button 
                  onClick={onSignup} style={{marginTop:'2%'}}
                  className="flex gap-1 items-center justify-center py-2.5 mt-3 text-white login-btn"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Send code via SMS</span>
                </button>

                <button onClick={() => navigate('../Mimik')} style={{marginTop:'2%'}}
                  className="flex gap-1 items-center justify-center py-2.5 mt-3 text-white login-btn">Skip Verification</button>

              </>
            )}
          </div>
        )}
      </div>
    </section>
    <Footer/>
    </>
  );
};

