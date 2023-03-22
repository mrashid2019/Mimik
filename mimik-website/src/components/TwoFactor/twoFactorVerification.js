import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const TwoFactorAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const confirmationResult = location.state.confirmationResult;

  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const credential = firebase.auth.PhoneAuthProvider.credential(
        confirmationResult.verificationId,
        verificationCode
      );
      await currentUser.signInWithCredential(credential);

      navigate("/");
    } catch (error) {
      console.log("Firebase error:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Two-Factor Authentication</h2>
      <p>A verification code has been sent to your phone number.</p>

      <form onSubmit={handleVerificationSubmit}>
        <label htmlFor="verificationCode">Verification Code:</label>
        <input
          type="text"
          id="verificationCode"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
        />

        {error && <p>{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Verifying..." : "Verify"}
        </button>
      </form>
    </div>
  );
};

export default TwoFactorAuth;
