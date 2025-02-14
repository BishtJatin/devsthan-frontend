import React, { useState } from "react";
import styles from "../../pages/forgot/forgot.module.css";
import Loader from "../../components/loader/loader"; //
import { toast } from "react-hot-toast";
import { apiCall } from "../../utils/common";

const ForgotPasswordForm = ({toggleForgotPasswordMode}) => {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [otpVerified, setOtpVerified] = useState(false); // Track OTP verification status

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setErrors({ email: "Please enter a valid email address." });
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const response = await apiCall({
        endpoint: "/api/user/forget-password",
        method: "POST",
        body: { email },
      });

      if (response.success) {
        setOtpSent(true);
        toast.success("OTP sent to your email.");
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      console.error("API call error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP with email and otp
  const verifyOtpdApi = async () => {
    try {
      const response = await apiCall({
        endpoint: `/api/user/verifyForgetOtp`,
        method: "POST",
        body: { email, otp },
      });

      if (response.success) {
        setOtpVerified(true); // Set OTP as verified
        toast.success("OTP Verified successfully");
      } else {
        toast.error("Invalid OTP");
      }
    } catch (error) {
      console.error("API call error:", error);
      toast.error("Something went wrong while verifying OTP.");
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
  
    if (!otp || !newPassword || !confirmPassword) {
      setErrors({
        otp: "Please enter the OTP.",
        newPassword: "Please enter a new password.",
        confirmPassword: "Please confirm your password.",
      });
      return;
    }
  
    if (newPassword !== confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match." });
      return;
    }
  
    setErrors({});
    setLoading(true);
  
    try {
      const response = await apiCall({
        endpoint: "/api/user/resetPassword",
        method: "POST",
        body: { email, newPassword, confirmPassword },
      });
  
      if (response.success) {
        toast.success("Password reset successfully. You can now log in.");
        // Refresh the page after successful password reset
        window.location.reload();
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      console.error("API call error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className={styles["form-container"]}>
      <h2 className={styles["card-title"]}>Forgot Password</h2>

      {loading ? (
        <div className={styles["loader-container"]}>
          <Loader />
        </div>
      ) : otpSent && !otpVerified ? (
        // Show OTP verification form
        <form onSubmit={(e) => { e.preventDefault(); verifyOtpdApi(); }} className={styles["form"]}>
          <div className={styles["form-group"]}>
            <label className={styles["form-label"]} htmlFor="otp">
              OTP<span className={styles["required"]}>*</span>
            </label>
            <input
              type="number"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className={styles["form-input"]}
              placeholder="Enter OTP"
            />
            {errors.otp && <span className={styles["error"]}>{errors.otp}</span>}
          </div>
          <button type="submit" className={styles["submit-button"]}>
            Verify OTP
          </button>
        </form>
      ) : otpVerified ? (
        // Show password reset form after OTP verification
        <form onSubmit={handleOtpSubmit} className={styles["form"]}>
          <div className={styles["form-group"]}>
            <label className={styles["form-label"]} htmlFor="newPassword">
              New Password<span className={styles["required"]}>*</span>
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={styles["form-input"]}
              placeholder="Enter new password"
            />
            {errors.newPassword && (
              <span className={styles["error"]}>{errors.newPassword}</span>
            )}
          </div>
          <div className={styles["form-group"]}>
            <label className={styles["form-label"]} htmlFor="confirmPassword">
              Confirm Password<span className={styles["required"]}>*</span>
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={styles["form-input"]}
              placeholder="Confirm new password"
            />
            {errors.confirmPassword && (
              <span className={styles["error"]}>{errors.confirmPassword}</span>
            )}
          </div>
          <button type="submit" className={styles["submit-button"]}>
            Reset Password
          </button>
        </form>
      ) : (
        // Show email input form before OTP verification
        <form onSubmit={handleEmailSubmit} className={styles["form"]}>
          <div className={styles["form-group"]}>
            <label className={styles["form-label"]} htmlFor="email">
              E-Mail<span className={styles["required"]}>*</span>
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles["form-input"]}
              placeholder="Enter your email"
            />
            {errors.email && <span className={styles["error"]}>{errors.email}</span>}
          </div>
          <button type="submit" className={styles["submit-button"]}>
            Send OTP
          </button>
        </form>
      )}
    </div>
  );
};

export default ForgotPasswordForm;
