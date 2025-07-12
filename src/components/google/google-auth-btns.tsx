import { GoogleCredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const GoogleAuthBtns = () => {
    const navigate = useNavigate();
    const { googleLogin } = useAuth();

    const handleGoogleLoginSuccess = async (credentialResponse: GoogleCredentialResponse) => {

      try {
        // Send the ID token to your backend for verification
        const res = await googleLogin(credentialResponse.credential);
        if (res) {
          navigate('/');
        }
      } catch (error) {
        console.error('Google login failed:', error);
      }
    };
  
    const handleGoogleLoginError = () => {
      console.log('Google Login Failed');
    };
  
    const handleGoogleLoginRedirect = () => {
      window.location.href = `http://localhost:3001/api/auth/google`;
    };
  return (
    <div>
    {/* <h2>Login</h2>
    <p>This button initiates the backend-driven Google OAuth flow:</p> */}
    {/* <button onClick={handleGoogleLoginRedirect}>Login with Google (Backend OAuth)</button> */}

    {/* <p>Or use the `GoogleLogin` component to get the ID token on the frontend and send to backend:</p> */}
    <GoogleLogin
      onSuccess={handleGoogleLoginSuccess}
      onError={handleGoogleLoginError}
      useOneTap={false}
    />
  </div>
  );
};

export default GoogleAuthBtns;