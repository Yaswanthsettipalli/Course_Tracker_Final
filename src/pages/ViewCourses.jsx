import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/ViewCourses.css";

function ViewCourses() {

  const [courses, setCourses] =
    useState([]);

  const navigate = useNavigate();

  const fetchCourses =
    async () => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      const res =
        await api.get(
          "/manage-courses/my-courses",
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

      setCourses(res.data);

    } catch (error) {

      console.error(error);

    }

  };

  useEffect(() => {

    fetchCourses();

  }, []);

  const deleteCourse =
    async (courseId) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this course?"
      );

    if (!confirmDelete) return;

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      await api.delete(
        `/manage-courses/${courseId}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      alert(
        "Course Deleted Successfully"
      );

      fetchCourses();

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Failed To Delete Course"
      );

    }

  };

  return (

    <div className="view-courses-page">

      <h1>
        📚 My Courses
      </h1>

      <div className="courses-grid">

        {courses.length === 0 ? (

          <h2>
            No Courses Created Yet
          </h2>

        ) : (

          courses.map((course) => (

            <div
              key={course.id}
              className="course-box"
            >

              <h2>
                {course.title}
              </h2>

              <p>
                {course.description}
              </p>

              <div className="course-actions">

                <button
                  className="open-btn"
                  onClick={() =>
                    navigate(
                      `/learning/${course.id}`
                    )
                  }
                >
                  Open
                </button>

                <button
                  className="edit-btn"
                  onClick={() =>
                    navigate(
                      `/update-course/${course.id}`
                    )
                  }
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteCourse(
                      course.id
                    )
                  }
                >
                  Delete
                </button>

              </div>

            </div>

          ))

        )}

      </div>

    </div>

  );
}

export default ViewCourses;