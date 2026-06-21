import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

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

    <div
      style={{
        maxWidth: "450px",
        margin: "100px auto",
        padding: "30px",
        background: "#111827",
        borderRadius: "12px",
        color: "white"
      }}
    >

      <h2>
        Forgot Password
      </h2>

      <form onSubmit={handleReset}>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px"
          }}
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
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px"
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px"
          }}
        >
          Reset Password
        </button>

      </form>

    </div>

  );

}

export default ForgotPassword;