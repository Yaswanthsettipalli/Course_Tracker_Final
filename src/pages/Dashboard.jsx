import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/Dashboard.css";

function Dashboard() {

  const navigate = useNavigate();

  const [stats, setStats] =
    useState({
      totalCourses: 0,
      enrolledCourses: 0,
      totalLessons: 0,
      progress: 0
    });

  const [courses, setCourses] =
    useState([]);

  const user = {
    name: "Yashwanth",
  };

  useEffect(() => {

    const fetchDashboard =
      async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const statsRes =
          await api.get(
            "/dashboard",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        setStats(
          statsRes.data
        );

        const courseRes =
  await api.get(
    "/courses",
    {
      headers: {
        Authorization:
          `Bearer ${token}`
      }
    }
  );
console.log(
  JSON.stringify(
    courseRes.data,
    null,
    2
  )
);
setCourses(
  courseRes.data.slice(0, 4)
);

      } catch (error) {

        console.error(error);

      }

    };

    fetchDashboard();

  }, []);

  const handleLogout = () => {

    localStorage.removeItem(
      "token"
    );

    navigate("/login");

  };

  return (

    <div className="dashboard-page">

      {/* Header */}

      <header className="dashboard-topbar">

        <div className="dashboard-logo">
          📚 CourseTracker
        </div>

        <div
  className="dashboard-icons"
  style={{
    position: "relative",
    zIndex: 99999
  }}
>

  <button
    onClick={() => {
      alert("Notifications Clicked");
    }}
    style={{
      cursor: "pointer",
      position: "relative",
      zIndex: 99999
    }}
  >
    🔔
  </button>

  <button
  className="icon-btn"
  onClick={() => {
    console.log("Settings button clicked");
    alert("Settings button clicked");
    navigate("/settings");
  }}
>
  ⚙️
</button>

  <button
    onClick={() => {
      alert("Profile Clicked");
    }}
    style={{
      cursor: "pointer",
      position: "relative",
      zIndex: 99999
    }}
  >
    👤
  </button>

</div>

      </header>

      {/* Welcome Banner */}

      <section className="welcome-banner">

        <div>

          <h1>
            Welcome Back,
            {" "}
            {user.name}
            👋
          </h1>

          <p>
            Continue your learning
            journey and achieve your
            goals.
          </p>

        </div>

      </section>

      {/* Live Stats */}

      <section className="dashboard-stats">

        <div className="dashboard-stat-card">

          <h2>
            {stats.totalCourses}
          </h2>

          <p>
            Total Courses
          </p>

        </div>

        <div className="dashboard-stat-card">

          <h2>
            {stats.enrolledCourses}
          </h2>

          <p>
            Enrolled Courses
          </p>

        </div>

        <div className="dashboard-stat-card">

          <h2>
            {stats.totalLessons}
          </h2>

          <p>
            Total Lessons
          </p>

        </div>

        <div className="dashboard-stat-card">

          <h2>
            {stats.progress}%
          </h2>

          <p>
            Progress
          </p>

        </div>

      </section>

      {/* Quick Actions */}

      <section className="quick-actions">

        <h2>
          Quick Actions
        </h2>

        <div className="action-grid">

          <button
            onClick={() =>
              navigate(
                "/post-course"
              )
            }
          >
            ➕ Create Course
          </button>

          <button
            onClick={() =>
              navigate(
                "/view-courses"
              )
            }
          >
            📚 My Courses
          </button>

          <button
            onClick={() =>
              navigate(
                "/courses"
              )
            }
          >
            🎯 Learning
          </button>

          <button>
            📊 Analytics
          </button>

        </div>

      </section>

      {/* Continue Learning */}

      <section className="course-section">

        <h2>
          Continue Learning
        </h2>

        {courses.map((course) => (

          <div
            key={course.id}
            className="dashboard-course-card"
          >

            <div>

              <h3>
                {course.title}
              </h3>

              <p>
                Total Lessons:
                {" "}
                {course.total_lessons}
              </p>

            </div>

            <button
              className="resume-btn"
              onClick={() =>
                navigate(
                  `/learning/${course.id}`
                )
              }
            >
              Open Course
            </button>

          </div>

        ))}

      </section>

      {/* Popular Courses */}

      <section className="recent-courses">

        <h2>
          Popular Courses
        </h2>

        <div className="recent-grid">

          {courses.map((course) => (

            <div
              key={course.id}
              className="recent-card"
            >

              <h3>
                {course.title}
              </h3>

              <p>
                {course.description}
              </p>

            </div>

          ))}

        </div>

      </section>

      {/* Footer */}

      <div className="dashboard-footer">

        <p>
          © 2026 CourseTracker
        </p>

        <button
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </div>

  );
}

export default Dashboard;