import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./ForgotPassword.css";
import { Link } from "react-router-dom";

function ForgotPassword() {

  const [email, setEmail] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const navigate =
    useNavigate();

  const handleReset =
    async (e) => {

    e.preventDefault();

    try {

      await api.post(
        "/auth/forgot-password",
        {
          email,
          newPassword
        }
      );

      alert(
        "Password Updated Successfully"
      );

      navigate("/login");

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Failed To Reset Password"
      );

    }

  };

return (
  <div className="forgot-page">

    <div className="forgot-card">

      <h2>
        🔑 Forgot Password
      </h2>

      <p>
        Enter your email and create a new password
      </p>

      <form onSubmit={handleReset}>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Enter New Password"
          value={newPassword}
          onChange={(e) =>
            setNewPassword(
              e.target.value
            )
          }
        />

        <button
          type="submit"
          className="reset-btn"
        >
          Reset Password
        </button>

      </form>

      <Link
        to="/login"
        className="back-login"
      >
        ← Back to Login
      </Link>

    </div>

  </div>
);

}

export default ForgotPassword;