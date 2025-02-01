import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons";
import "./auth.css";

const Login = ({ onLoginSuccess }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const users = {
    "rida@gmail.com": { password: "rida", role: "Manager" },
    "marwa@gmail.com": { password: "marwa", role: "Manager" },
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const user = users[email];
    if (user && user.password === password) {
      onLoginSuccess(user.role);
      navigate("/home");
    } else if (!email.includes("@")) {
      setError("Invalid email format. Please include an '@' symbol.");
    } else {
      setError("Wrong login details, please try again.");
    }
  };

  const validatePassword = (password) => {
    return (
      password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password)
    );
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setError("Invalid email format. Please include an '@' symbol.");
    } else if (!validatePassword(password)) {
      setError(
        "Password must be at least 8 characters, include uppercase and lowercase letters."
      );
    } else {
      navigate("/home");
    }
  };

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    const user = users[email];
    if (!user) {
      setError("Email not found.");
    } else if (user.password !== oldPassword) {
      setError("Old password is incorrect.");
    } else if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
    } else if (!validatePassword(newPassword)) {
      setError(
        "Password must be at least 8 characters, include uppercase and lowercase letters."
      );
    } else {
      user.password = newPassword;
      setError("");
      setSuccessMessage("Password changed successfully.");
      setEmail("");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setIsForgotPassword(false);
    }
  };

  return (
    <div className="container">
      <div className="left-panel">
        <h1 className="loginslogan">
          {isRegister ? "Start Learning Today" : "IBMSkillsBuild+"}
        </h1>
        <iframe
          className="animation login-animation"
          src="https://lottie.host/embed/2a290b4d-5cd1-4861-8b51-bf6771aef879/q96qOKhIjJ.lottie"
        ></iframe>
      </div>
      <div className="right-panel">
        <div className="auth-box">
          <h2>
            {isRegister
              ? "Register"
              : isForgotPassword
              ? "Forgot Password"
              : "Log In"}
          </h2>
          <form
            onSubmit={
              isForgotPassword
                ? handleForgotPasswordSubmit
                : isRegister
                ? handleRegisterSubmit
                : handleLoginSubmit
            }
          >
            {isRegister && (
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-field"
              />
            )}
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
            />
            {!isForgotPassword && (
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
              />
            )}
            {isForgotPassword && (
              <>
                <input
                  type="password"
                  placeholder="Old Password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="input-field"
                />
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="input-field"
                />
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input-field"
                />
              </>
            )}
            <button type="submit" className="button">
              {isForgotPassword
                ? "Reset Password"
                : isRegister
                ? "Register"
                : "Sign In"}
            </button>
            {error && <p className="error">{error}</p>}
            {successMessage && <p className="success">{successMessage}</p>}
          </form>
          <p className="link-text">
            {isForgotPassword ? (
              <span onClick={() => setIsForgotPassword(false)} className="link">
                Go back to login
              </span>
            ) : isRegister ? (
              <>
                Already have an account?{" "}
                <span onClick={() => setIsRegister(false)} className="link">
                  Login here
                </span>
              </>
            ) : (
              <>
                Don’t have an account?{" "}
                <span onClick={() => setIsRegister(true)} className="link">
                  Register Here
                </span>
              </>
            )}
          </p>
          {!isForgotPassword && !isRegister && (
            <p>
              <span
                onClick={() => setIsForgotPassword(true)}
                className="link"
              >
                Forgot Password?
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
