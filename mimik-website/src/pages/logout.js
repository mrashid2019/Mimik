import React from "react";
import { useNavigate } from "react-router-dom";


function LogoutPage() {
  const history = useNavigate();

  function handleReturnToLogin() {
    history.push("/login"); 
  }

  return (
    <div>
      <h1>You have successfully logged out.</h1>
      <button onClick={handleReturnToLogin}>Return to Login</button>
    </div>
  );
}

export default LogoutPage;