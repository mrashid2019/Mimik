import React from 'react';
import { Alert, Box, Button, Collapse, IconButton } from "@mui/material"
import { Close } from "@mui/icons-material"
import { sendEmailVerification } from "firebase/auth";
import { useState } from "react";
import { useAuth } from "../../context/userAuthContext";

const Verification = () => { 
    const {currentUser, setAlert, setLoading} = useAuth();
    const [open, setOpen] = useState(true);
    const [isClicked, setIsClicked] = useState(false);
    
    const verify = async () => {
        setIsClicked(true);
        setLoading(true);

        try{
            console.log("Sending email verification...");
            await sendEmailVerification(currentUser)
            setAlert({
                isAlert:true,
                severity: "info",
                message: "Verification link has been sent to your email",
                location:"main"
            })
            console.log("Email verification sent.");
        } catch (error){
            setAlert({
                isAlert:true,
                severity: "error",
                message: error.message,
                timeout:8000,
                location:"main"
            })
            console.log("Error sending email verification:", error);
        }
        setLoading(false);
    };

    return (
        currentUser?.emailVerified === false && (
            <Box>
                <Collapse in={open}>
                <Alert
                    severity="warning"
                    action={
                    <IconButton
                    aria-label="Close"
                    size="small"
                    onClick={()=>setOpen(false)}
                    >
                    <Close fontSize="inherit" />
                    </IconButton>
                    }
                    sx={{mb:3}}
                >
                    Your email has not been verified yet!
                    <Button
                    size="small"
                    onClick={verify}
                    disabled={isClicked}
                    sx={{lineHeight: 'initial'}}>
                    Verify Now
                    </Button>
                </Alert>
                </Collapse>
            </Box>
        )
    )   
}

export default Verification;
