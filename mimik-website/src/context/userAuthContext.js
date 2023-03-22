import { createContext, useContext, useEffect, useState } from "react";
import {
  AuthErrorCodes,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail
} from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

const userContext = createContext({});
export const AuthContext = createContext();
export const useAuth = () => { return useContext(userContext)};

const UserAuthContext = ({ children, type}) => {
  const [signUpError, setSignUpError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user ? user : null)
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        localStorage.removeItem("user");
      }
    });
    // Check local storage for user data
    const userData = localStorage.getItem("user");
    if (userData) {
      setCurrentUser(JSON.parse(userData));
    }

    return unsubscribe()

  }, []);

  function signUp(email, password, firstName, lastName, phoneNumber) {
    setSignUpError("");

    createUserWithEmailAndPassword(auth, email, password) 
      .then((userCredential) => {
        const user = userCredential.user;

        setDoc(doc(db, "RegisteredUsers", user.uid), {
          firstName,
          lastName,
          phoneNumber,
          email
        })
          .then(() => {
            console.log("Document successfully written!");
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });
          user.updateProfile({
            displayName: `${firstName} ${lastName}`,
          });
        // Set user data in local storage
        localStorage.setItem("user", JSON.stringify(user));
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          setSignUpError("Email already in use");
        } else if (error.code === "auth/invalid-email") {
          setSignUpError("Invalid email address");
        } else if (error.code === "auth/weak-password") {
          setSignUpError("Password is too weak");
        } else {
          setSignUpError(error.message);
        }
      });
  }

  function logIn(email, password) {
    setLoginError("");

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const currentUser = userCredential.user;
        setCurrentUser(currentUser);
        console.log(currentUser);

        // Set user data in local storage
        localStorage.setItem("user", JSON.stringify(currentUser));
      })
      .catch((error) => {
        setLoginError(error.message);
        
      });
  }

  function logOut() {
    signOut(auth).then(() => {
      setCurrentUser(null);
      // Remove user data from local storage
      localStorage.removeItem("user");
    });
  }

  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleAuthProvider)
      .then((result) => {
        const user = result.user;
        if (user.displayName === null) {
          const firstName = user.displayName.split(" ")[0];
          const lastName = user.displayName.split(" ")[1];
        }
        
        setCurrentUser(user);
      })
      .catch((error) => {
        setLoginError(error.message);
      });
      
  }

  function forgotPassword(email) {
    // Check if the email entered is a Gmail address
    if (/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email)) {
      return Promise.reject(new Error("Password reset is not available for Gmail accounts."));
    }
  // If the email is not a Gmail address, send the password reset email
    return sendPasswordResetEmail(auth, email);
  }

  const contextValue = {
    currentUser,
    signUp,
    logIn,
    logOut,
    googleSignIn,
    forgotPassword,
    error: type === "signup" ? signUpError : loginError,
  };

  return (
    <userContext.Provider value={contextValue}>
      {children}
    </userContext.Provider>
  );
};

export{ UserAuthContext} ;
