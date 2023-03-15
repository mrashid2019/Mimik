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

const UserAuthContext = ({ children }) => {
  const [error, setError] = useState("")
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

  function signUp(email, password, confirmPassword, firstName, lastName, phoneNumber) {
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

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
          setError("Email already in use");
        } else if (error.code === "auth/invalid-email") {
          setError("Invalid email address");
        } else if (error.code === "auth/weak-password") {
          setError("Password is too weak");
        } else {
          setError(error.message);
        }
      });
  }

  function logIn(email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setCurrentUser(user);

        // Set user data in local storage
        localStorage.setItem("user", JSON.stringify(user));
      })
      .catch((error) => {
        setError(error.message);
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
        setError(error.message);
      });
      
  }

  // function forgotPassword(email) {
  //   sendPasswordResetEmail(auth, email)
  //     .then(() => {
  //       console.log("Password reset email sent");
  //     })
  //     .catch((error) => {
  //       setError(error.message);
  //     });
  // }

  function forgotPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  const contextValue = {
    currentUser,
    signUp,
    logIn,
    logOut,
    googleSignIn,
    forgotPassword,
    error,
  };

  return (
    <userContext.Provider value={contextValue}>
      {children}
    </userContext.Provider>
  );
};

export default UserAuthContext;
