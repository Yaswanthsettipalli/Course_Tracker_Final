import { useEffect, useState } from "react";
import api from "../services/api";
import Footer from "../components/Footer";
import "../styles/Courses.css";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get("/courses");
        setCourses(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCourses();
  }, []);

  const enrollCourse = async (courseId) => {
    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/enrollments",
        { courseId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Enrolled Successfully");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Enrollment Failed"
      );
    }
  };

  const filteredCourses = courses.filter((course) =>
    course.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="courses-page">

      {/* HEADER */}

      <header className="dashboard-header">

        <div className="logo">
          CourseTracker
        </div>

        <input
          type="text"
          placeholder="Search courses..."
          className="search-bar"
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
        />

        <div className="header-actions">

          <select className="filter-select">
            <option>All Categories</option>
            <option>Web Development</option>
            <option>Java</option>
            <option>Python</option>
            <option>DSA</option>
            <option>Data Analytics</option>
          </select>

          <button className="icon-btn">
            🔔
          </button>

          <button className="icon-btn">
            ⚙️
          </button>

          <div className="profile">
  👤 WelCome
            </div>

        </div>

      </header>

      {/* HERO SECTION */}

      <section className="hero-banner">

        <h1>
          Continue Your Learning Journey 🚀
        </h1>

        <p>
          Learn React, Node.js, Java,
          Python, DSA and more.
        </p>

      </section>

      {/* COURSE SECTION */}

      <section className="courses-section">

        <div className="section-header">
          <h2>Available Courses</h2>
        </div>

        <div className="course-grid">

          {filteredCourses.map((course) => (

            <div
              key={course.id}
              className="course-card"
            >

              <img
                src={`https://picsum.photos/500/300?random=${course.id}`}
                alt={course.title}
              />

              <div className="course-content">

                <h3>{course.title}</h3>

                <p>
                  {course.description}
                </p>

                <div className="course-meta">

                  <span>
                    📚 {course.total_lessons}
                    Lessons
                  </span>

                </div>

                <button
                  className="enroll-btn"
                  onClick={() =>
                    enrollCourse(course.id)
                  }
                >
                  Enroll Now
                </button>

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* FOOTER */}

      <Footer/>

    </div>
  );
}

export default Courses;