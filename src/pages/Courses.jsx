import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Footer from "../Components/Footer.jsx";
import "../styles/Courses.css";

function Courses() {

  const [courses, setCourses] =
    useState([]);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [selectedCategory, setSelectedCategory] =
    useState("All Categories");

  const [showMenu, setShowMenu] =
    useState(false);

  const [showNotifications, setShowNotifications] =
    useState(false);

  const [notifications, setNotifications] =
    useState([]);
    const [userName, setUserName] =
  useState("");
  const [enrolledCourses, setEnrolledCourses] =
  useState([]);

  const navigate =
    useNavigate();

  useEffect(() => {

    const fetchCourses =
      async () => {

      try {

        const token =
  localStorage.getItem(
    "token"
  );

const profileRes =
  await api.get(
    "/auth/profile",
    {
      headers: {
        Authorization:
          `Bearer ${token}`
      }
    }
  );

setUserName(
  profileRes.data.name
);
const enrollRes =
  await api.get(
    "/enrollments/my-courses",
    {
      headers: {
        Authorization:
          `Bearer ${token}`
      }
    }
  );

setEnrolledCourses(
  enrollRes.data.map(
    item => item.course_id
  )
);

const res =
  await api.get(
    "/courses",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        setCourses(
          res.data
        );

        const latestCourses =
          [...res.data]
            .sort(
              (a, b) =>
                new Date(
                  b.created_at
                ) -
                new Date(
                  a.created_at
                )
            )
            .slice(0, 5);

        setNotifications(
          latestCourses.map(
            (course) => ({
              id: course.id,
              message:
                `New Course Added: ${course.title}`
            })
          )
        );

      } catch (error) {

        console.error(
          "Fetch Courses Error:",
          error
        );

      }

    };

    fetchCourses();

  }, []);

  const enrollCourse =
    async (courseId) => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

    await api.post(
  "/enrollments",
  { courseId },
  {
    headers: {
      Authorization:
        `Bearer ${token}`
    }
  }
);

setEnrolledCourses(
  prev => [
    ...prev,
    courseId
  ]
);

navigate(
  `/learning/${courseId}`
);

    } catch (error) {

      console.error(error);

      navigate(
        `/learning/${courseId}`
      );

    }

  };

  const filteredCourses =
    courses.filter(
      (course) => {

        const matchesSearch =
          course.title
            .toLowerCase()
            .includes(
              searchTerm.toLowerCase()
            );

        const matchesCategory =
          selectedCategory ===
          "All Categories"
            ? true
            : course.category ===
              selectedCategory;

        return (
          matchesSearch &&
          matchesCategory
        );

      }
    );

  return (

    <div className="courses-page">

      <header className="dashboard-header">

        <div className="logo">
          📚 CourseTracker
        </div>

        <input
          type="text"
          placeholder="Search courses..."
          className="search-bar"
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(
              e.target.value
            )
          }
        />

        <div className="header-actions">

          <select
            className="filter-select"
            value={
              selectedCategory
            }
            onChange={(e) =>
              setSelectedCategory(
                e.target.value
              )
            }
          >
            <option>
              All Categories
            </option>

            <option>
              Web Development
            </option>

            <option>
              Java
            </option>

            <option>
              Python
            </option>

            <option>
              DSA
            </option>

            <option>
              Data Analytics
            </option>
          </select>

          {/* Notifications */}

          <div
            style={{
              position:
                "relative"
            }}
          >

            <button
              className="icon-btn"
              onClick={() =>
                setShowNotifications(
                  !showNotifications
                )
              }
            >
              🔔

              {notifications.length >
                0 && (

                <span
                  className="notification-badge"
                >
                  {
                    notifications.length
                  }
                </span>

              )}

            </button>

            {showNotifications && (

              <div
                className="notification-dropdown"
              >

                <h4>
                  Notifications
                </h4>

                {notifications.length ===
                0 ? (

                  <p>
                    No Notifications
                  </p>

                ) : (

                  notifications.map(
                    (
                      notification
                    ) => (

                      <div
                        key={
                          notification.id
                        }
                        className="notification-item"
                      >
                        {
                          notification.message
                        }
                      </div>

                    )
                  )

                )}

              </div>

            )}

          </div>

          {/* Settings */}

          <button
            className="icon-btn"
            onClick={() =>
              navigate(
                "/settings"
              )
            }
          >
            ⚙️
          </button>

          {/* Profile */}

          <div className="profile-container">

            <div
  className="profile"
  onClick={() =>
    setShowMenu(
      !showMenu
    )
  }
>
  👤 Welcome,
  {" "}
  {userName || "User"}
</div>

            {showMenu && (

              <div className="profile-menu">

                <div
                  onClick={() =>
                    navigate(
                      "/post-course"
                    )
                  }
                >
                  ➕ Post Course
                </div>

                <div
                  onClick={() =>
                    navigate(
                      "/view-courses"
                    )
                  }
                >
                  📚 View Courses
                </div>

                <div
                  onClick={() =>
                    navigate(
                      "/dashboard"
                    )
                  }
                >
                  📊 Dashboard
                </div>

                <div
                  onClick={() => {

                    localStorage.removeItem(
                      "token"
                    );

                    navigate(
                      "/login"
                    );

                  }}
                >
                  🚪 Logout
                </div>

              </div>

            )}

          </div>

        </div>

      </header>

      <section className="hero-banner">

        <h1>
          Continue Your Learning Journey 🚀
        </h1>

        <p>
          Learn React, Node.js,
          Java, Python, DSA
          and more.
        </p>

      </section>

      <section className="courses-section">

        <div className="section-header">

          <h2>
            Available Courses
          </h2>

        </div>

        <div className="course-grid">

          {filteredCourses.map(
            (course) => (

              <div
                key={course.id}
                className="course-card"
              >

                <img
                  src={`https://picsum.photos/500/300?random=${course.id}`}
                  alt={course.title}
                />

                <div className="course-content">

                  <h3>
                    {course.title}
                  </h3>

                  <p>
                    {course.description}
                  </p>

                  <div className="course-meta">

                    <span>
                      📚{" "}
                      {
                        course.total_lessons
                      }{" "}
                      Lessons
                    </span>

                  </div>

                  {enrolledCourses.includes(
  course.id
) ? (

  <button
    className="enroll-btn"
    onClick={() =>
      navigate(
        `/learning/${course.id}`
      )
    }
  >
    Open Course
  </button>

) : (

  <button
    className="enroll-btn"
    onClick={() =>
      enrollCourse(
        course.id
      )
    }
  >
    Enroll Course
  </button>

)}

                </div>

              </div>

            )
          )}

        </div>

      </section>

      <Footer />

    </div>

  );

}

export default Courses;