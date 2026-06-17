import "../styles/UpdateCourse.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function UpdateCourse() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");
  const [category, setCategory] =
    useState("");
  const [lessons, setLessons] =
    useState([]);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        const res = await api.get(
          `/update-course/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setTitle(
          res.data.course.title
        );

        setDescription(
          res.data.course.description
        );

        setCategory(
          res.data.course.category
        );

        setLessons(
          res.data.lessons || []
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchCourse();
  }, [id]);

  const handleLessonChange = (
    index,
    field,
    value
  ) => {
    const updatedLessons = [
      ...lessons,
    ];

    updatedLessons[index][field] =
      value;

    setLessons(updatedLessons);
  };

  const addLesson = () => {
    setLessons([
      ...lessons,
      {
        title: "",
        video_url: "",
        content: "",
      },
    ]);
  };

  const deleteLesson = (
    index
  ) => {
    const updatedLessons =
      lessons.filter(
        (_, i) => i !== index
      );

    setLessons(updatedLessons);
  };

  const saveChanges =
    async () => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        await api.put(
          `/update-course/${id}`,
          {
            title,
            description,
            category,
            lessons,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert(
          "Course Updated Successfully 🚀"
        );

        navigate(
          "/view-courses"
        );
      } catch (error) {
        console.error(error);

        alert(
          error.response?.data
            ?.message ||
            "Failed To Update Course"
        );
      }
    };

  return (
    <div className="update-course-page">
      <div className="update-course-container">

        <h1 className="update-course-title">
          ✏️ Update Course
        </h1>

        <div className="course-form-card">

          <input
            type="text"
            placeholder="Course Title"
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
          />

          <textarea
            rows="5"
            placeholder="Course Description"
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
          />

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) =>
              setCategory(
                e.target.value
              )
            }
          />

        </div>

        <h2 className="section-heading">
          📚 Course Lessons
        </h2>

        {lessons.map(
          (
            lesson,
            index
          ) => (
            <div
              key={index}
              className="lesson-card"
            >
              <h3>
                Lesson {index + 1}
              </h3>

              <input
                type="text"
                placeholder="Lesson Title"
                value={
                  lesson.title ||
                  ""
                }
                onChange={(e) =>
                  handleLessonChange(
                    index,
                    "title",
                    e.target.value
                  )
                }
              />

              <input
                type="text"
                placeholder="YouTube Embed URL"
                value={
                  lesson.video_url ||
                  ""
                }
                onChange={(e) =>
                  handleLessonChange(
                    index,
                    "video_url",
                    e.target.value
                  )
                }
              />

              <textarea
                rows="4"
                placeholder="Lesson Notes"
                value={
                  lesson.content ||
                  ""
                }
                onChange={(e) =>
                  handleLessonChange(
                    index,
                    "content",
                    e.target.value
                  )
                }
              />

              <button
                className="delete-btn"
                onClick={() =>
                  deleteLesson(
                    index
                  )
                }
              >
                Delete Lesson
              </button>
            </div>
          )
        )}

        <div className="btn-group">

          <button
            className="add-btn"
            onClick={addLesson}
          >
            + Add Lesson
          </button>

          <button
            className="save-btn"
            onClick={saveChanges}
          >
            Save Changes
          </button>

        </div>

      </div>
    </div>
  );
}

export default UpdateCourse;