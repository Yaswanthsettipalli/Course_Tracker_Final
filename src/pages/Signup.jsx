import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Signup.css";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", formData);

      alert("Account Created Successfully!");

      navigate("/login");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
        "Registration Failed"
      );
    }
  };

  return (
    <div className="signup-page">

      <div className="signup-left">

        <div className="signup-badge">
          🚀 Join CourseTrack
        </div>

        <h1>
          Start Building
          <span> Your Skills</span>
        </h1>

        <p>
          Create your account and access
          hundreds of courses designed
          to accelerate your career.
        </p>

        <div className="signup-features">

          <div>✅ Track Progress</div>

          <div>✅ Enroll in Courses</div>

          <div>✅ Earn Certificates</div>

          <div>✅ Build Your Portfolio</div>

        </div>

      </div>

      <div className="signup-card">

        <h2>Create Account</h2>

        <p>
          Start learning for free
        </p>

        <form onSubmit={handleSignup}>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

          <button type="submit">
            Create Account
          </button>

        </form>

        <div className="divider">
          OR
        </div>

        <Link
          className="login-link"
          to="/login"
        >
          Already have an account?
          Login
        </Link>

      </div>

    </div>
  );
}

export default Signup;