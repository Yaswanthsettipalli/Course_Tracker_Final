import { useEffect, useState } from "react";
import api from "../services/api";

function Courses() {
  const [courses, setCourses] = useState([]);

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

  return (
    <div>
      <h1>Available Courses</h1>

      {courses.map((course) => (
        <div
          key={course.id}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            margin: "10px",
            borderRadius: "8px",
          }}
        >
          <h3>{course.title}</h3>
          <p>{course.description}</p>
          <p>Total Lessons: {course.total_lessons}</p>

          <button
            onClick={() => enrollCourse(course.id)}
          >
            Enroll
          </button>
        </div>
      ))}
    </div>
  );
}

export default Courses;