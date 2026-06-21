import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import "./ForgotPassword.css";

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
          "Password Updated Successfully ✅"
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

      <div className="forgot-container">

        <div className="forgot-card">

          <div className="forgot-icon">
            🔑
          </div>

          <h1>
            Forgot Password
          </h1>

          <p>
            Enter your registered email
            and create a new password.
          </p>

          <form onSubmit={handleReset}>

            <div className="forgot-group">

              <label>
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                required
              />

            </div>

            <div className="forgot-group">

              <label>
                New Password
              </label>

              <input
                type="password"
                placeholder="Enter New Password"
                value={newPassword}
                onChange={(e) =>
                  setNewPassword(
                    e.target.value
                  )
                }
                required
              />

            </div>

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
            ← Back To Login
          </Link>

        </div>

      </div>

    </div>

  );

}

export default ForgotPassword;