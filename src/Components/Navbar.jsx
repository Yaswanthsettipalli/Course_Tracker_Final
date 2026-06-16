import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo">
        📚 CourseTracker
      </div>

      <div className="nav-links">
        <a href="/">Home</a>
        <a href="#features">Courses</a>
        <a href="#about">About</a>
        <a href="#offers">Offers</a>
        <a href="#contact">Contact</a>
      </div>

      <Link to="/login">
        <button className="sign-btn">
          Sign In
        </button>
      </Link>

    </nav>
  );
}

export default Navbar;