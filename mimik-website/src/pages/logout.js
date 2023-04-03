import React from "react";
import { useNavigate } from "react-router-dom";


function LogoutPage() {
  const navigate = useNavigate();

  function handleReturnToLogin() {
    navigate("/login"); 
  }

  return (
    <div style={{ textAlign: "center", paddingTop: "100px" }}>
      <h2>You have successfully logged out.</h2>
      <button onClick={handleReturnToLogin}>Return to Login</button>
    </div>
  );
}

export default LogoutPage;