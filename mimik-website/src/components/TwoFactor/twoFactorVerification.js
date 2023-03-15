import { auth } from "firebase/app";
import "firebase/auth";

import {
    multiFactor, 
    PhoneAuthProvider,
    PhoneMultiFactorGenerator,
    RecaptchaVerifier
} from "firebase/auth";

const recaptchaVerifier = new RecaptchaVerifier(
    'recaptcha-container-id', 
    {size: "invisible",
     callback:(response) => {
        console.log("Recaptcha solved");
     }
    });
    
multiFactor(user).getSession()
    .then(function (multiFactorSession) {
        // Specify the phone number and pass the MFA session.
        const phoneInfoOptions = {
            phoneNumber: phoneNumber,
            session: multiFactorSession
        };

        const phoneAuthProvider = new PhoneAuthProvider(auth);

        // Send SMS verification code.
        console.log('verification code sent');
        return phoneAuthProvider.verifyPhoneNumber(phoneInfoOptions, recaptchaVerifier);
        

    }).then(function (verificationId) {
        // Ask user for the verification code. 
        const verificationCode = prompt("Enter verification code:");

        
        const cred = PhoneAuthProvider.credential(verificationId, verificationCode);
        const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(cred);

        // Complete enrollment.
        return multiFactor(user).enroll(multiFactorAssertion, mfaDisplayName);
    });

