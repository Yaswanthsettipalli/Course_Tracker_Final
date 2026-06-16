import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero">

      <div className="hero-content">

        <h1>
          Education is the best
          <br />
          way to <span>Grow Your</span>
          <br />
          <span>Knowledge</span>
        </h1>

        <p>
          Track courses, monitor progress,
          and achieve your learning goals
          with CourseTracker.
        </p>

        <div className="hero-buttons">

          <Link to="/signup">
            <button className="primary-btn">
              Get Started
            </button>
          </Link>

          <button className="secondary-btn">
            Learn More
          </button>

        </div>

        <div className="reviews">

          <div className="avatars">
            <img
              src="https://i.pravatar.cc/40?img=1"
              alt=""
            />
            <img
              src="https://i.pravatar.cc/40?img=2"
              alt=""
            />
            <img
              src="https://i.pravatar.cc/40?img=3"
              alt=""
            />
            <img
              src="https://i.pravatar.cc/40?img=4"
              alt=""
            />
          </div>

          <div className="review-text">
            ⭐⭐⭐⭐⭐ (4.8)
            <br />
            1000+ Happy Students
          </div>

        </div>

      </div>

      <div className="hero-image">

        <div className="circle"></div>

        <img
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600"
          alt="student"
        />

        <div className="floating-card card-1">
          <h4>100+</h4>
          <p>Online Courses</p>
        </div>

        <div className="floating-card card-2">
          <h4>UI Design</h4>
          <button>Join Now</button>
        </div>

      </div>

    </section>
  );
}

export default Hero;