import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios  from "axios";
import { serverUrl } from "./../App";
import {ClipLoader} from 'react-spinners/ClipLoader';
import { toast } from "react-toastify";

function ForgetPassword() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  //for step 1
  const sendOTP = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/sendotp`,
        { email },
        { withCredentials: true }
      );
      console.log(result.data);
      setLoading(false);
      setStep(2);
      toast.success("OTP send");
    } catch (error) {
      console.log(error);
      toast.error("OTP error");
      setLoading(false);
    }
  };

  //for step 2
  const verifyOTP = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/verifyotp`,
        { email, otp },
        { withCredentials: true }
      );
      console.log(result.data);
      setLoading(false);
      setStep(3);
      toast.success("OTP verified");
    } catch (error) {
      console.log(error);
      toast.error("OTP error");
      setLoading(false);
    }
  };

  //for step 3
  const resetPassword = async () => {
    setLoading(true);
    try {
      if (password !== confirmPassword) {
        return toast.error("Password is not matched");
      }

      const result = await axios.post(
        `${serverUrl}/api/auth/resetpassword`,
        { email, password },
        { withCredentials: true }
      );
      console.log(result.data);
      setLoading(false);
      navigate("/login");
      toast.success("Password Reset Successful");
    } catch (error) {
      console.log(error);
      toast.error("Reset password error");
      setLoading(false);
    }
  };

  return (
    <div>
      {/* step 1 */}
      {step == 1 && (
        <div>
          <h2>Forget Your Password</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="email">Enter Your Email : </label>
              <input
                id="email"
                type="text"
                required
                placeholder="you@example.com"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <button disabled={loading} onClick={sendOTP}>
              {loading ? <ClipLoader size={30} color="white" /> : "sendOTP"}
            </button>
            <div onClick={() => navigate("/login")}> Back to Login</div>
          </form>
        </div>
      )}

      {/* step 2 */}
      {step == 2 && (
        <div>
          <h2>Enter OTP</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="otp">Enter OTP send to your Email</label>
              <input
                id="otp"
                type="text"
                required
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
                placeholder="* * * *"
              />
            </div>
            <button disabled={loading} onClick={verifyOTP}>
              {loading ? <ClipLoader size={30} color="white" /> : "Verify OTP"}
            </button>
            <div onClick={() => navigate("/login")}> Back to Login</div>
          </form>
        </div>
      )}

      {/* step 3 */}
      {step == 3 && (
        <div>
          <h2>Reset Your Password</h2>
          <p>Enter a new Password below to regain access to your account.</p>
          <form onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="password">Enter New Password : </label>
              <input
                id="password"
                type="text"
                required
                placeholder="***********"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <div>
              <label htmlFor="password">Confirm Password : </label>
              <input
                id="password"
                type="text"
                required
                placeholder="***********"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
            </div>
            <button disabled={loading} onClick={resetPassword}>
              
              {loading ? (
                <ClipLoader size={30} color="white" />
              ) : (
                "Reset Password"
              )}
            </button>
            <div onClick={() => navigate("/login")}> Back to Login</div>
          </form>
        </div>
      )}
    </div>
  );
}

export default ForgetPassword;
