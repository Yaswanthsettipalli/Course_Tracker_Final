import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Login.css";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin =
    async (e) => {

    e.preventDefault();

    try {

      const res =
        await api.post(
          "/auth/login",
          {
            email,
            password,
          }
        );

      localStorage.setItem(
        "token",
        res.data.token
      );

      alert(
        "Login Successful"
      );

      navigate(
        "/courses"
      );

    } catch (err) {

      console.error(err);

      alert(
        err?.response?.data?.message ||
        err?.message ||
        "Login Failed"
      );

    }

  };

  return (

    <div className="login-page">

      <div className="login-left">

        <div className="login-badge">
          🎓 Welcome Back
        </div>

        <h1>
          Continue Your
          <span>
            {" "}
            Learning Journey
          </span>
        </h1>

        <p>
          Access your enrolled courses,
          track progress, and complete
          lessons from your dashboard.
        </p>

        <div className="login-stats">

          <div>
            <h3>180+</h3>
            <span>
              Courses
            </span>
          </div>

          <div>
            <h3>2400+</h3>
            <span>
              Students
            </span>
          </div>

          <div>
            <h3>94%</h3>
            <span>
              Completion
            </span>
          </div>

        </div>

      </div>

      <div className="login-card">

        <h2>
          Login
        </h2>

        <p>
          Sign in to continue learning
        </p>

        <form
          onSubmit={
            handleLogin
          }
        >

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
          />

          <div
            style={{
              textAlign:
                "right",
              marginBottom:
                "15px",
            }}
          >

            <Link
              to="/forgot-password"
              style={{
                color:
                  "#00C896",
                textDecoration:
                  "none",
                fontSize:
                  "14px",
              }}
            >
              Forgot Password?
            </Link>

          </div>

          <button
            type="submit"
          >
            Sign In
          </button>

        </form>

        <div className="divider">
          OR
        </div>

        <Link
          to="/signup"
          className="signup-link"
        >
          Create New Account
        </Link>

      </div>

    </div>

  );

}

export default Login;