import { useState } from "react";
import api from "../services/api";
import "../styles/PostCourse.css";

function PostCourse() {

  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [thumbnail, setThumbnail] =
    useState("");

  const [category, setCategory] =
    useState("Web Development");

  const [lessons, setLessons] = useState([
   {
  title: "",
  video_url: "",
  notes: "",
  topics: "",
  notes_pdf: "",
  cheatsheet_pdf: "",
  source_code_pdf: "",
  assignment_pdf: ""
}
  ]);

  const addLesson = () => {

    setLessons([
      ...lessons,
      {
        title: "",
        video_url: "",
        notes: "",
        topics: ""
      }
    ]);

  };

  const handleLessonChange = (
    index,
    field,
    value
  ) => {

    const updatedLessons =
      [...lessons];

    updatedLessons[index][field] =
      value;

    setLessons(updatedLessons);

  };

  const publishCourse =
    async () => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      await api.post(
        "/create-course",
        {
          title,
          description,
          thumbnail,
          category,
          lessons
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      alert(
        "Course Published Successfully 🚀"
      );

      setTitle("");
      setDescription("");
      setThumbnail("");

      setLessons([
        {
          title: "",
          video_url: "",
          notes: "",
          topics: ""
        }
      ]);

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Failed To Publish Course"
      );

    }

  };

  return (

    <div className="post-course-page">

      <h1>
        Create New Course
      </h1>

      <div className="course-form">

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
          placeholder="Thumbnail URL"
          value={thumbnail}
          onChange={(e) =>
            setThumbnail(
              e.target.value
            )
          }
        />

        <select
          value={category}
          onChange={(e) =>
            setCategory(
              e.target.value
            )
          }
        >

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

      </div>
          <input
  type="text"
  placeholder="Notes PDF URL"
  value={lesson.notes_pdf}
  onChange={(e) =>
    handleLessonChange(
      index,
      "notes_pdf",
      e.target.value
    )
  }
/>

<input
  type="text"
  placeholder="Cheat Sheet URL"
  value={lesson.cheatsheet_pdf}
  onChange={(e) =>
    handleLessonChange(
      index,
      "cheatsheet_pdf",
      e.target.value
    )
  }
/>

<input
  type="text"
  placeholder="Source Code URL"
  value={lesson.source_code_pdf}
  onChange={(e) =>
    handleLessonChange(
      index,
      "source_code_pdf",
      e.target.value
    )
  }
/>

<input
  type="text"
  placeholder="Assignment URL"
  value={lesson.assignment_pdf}
  onChange={(e) =>
    handleLessonChange(
      index,
      "assignment_pdf",
      e.target.value
    )
  }
/>
      <h2>
        Course Lessons
      </h2>

      {lessons.map(
        (
          lesson,
          index
        ) => (

          <div
            key={index}
            className="lesson-box"
          >

            <h3>
              Lesson {index + 1}
            </h3>

            <input
              type="text"
              placeholder="Lesson Title"
              value={lesson.title}
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
                lesson.video_url
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
              placeholder="Lesson Notes"
              value={lesson.notes}
              onChange={(e) =>
                handleLessonChange(
                  index,
                  "notes",
                  e.target.value
                )
              }
            />

            <textarea
              placeholder="Topics Covered"
              value={lesson.topics}
              onChange={(e) =>
                handleLessonChange(
                  index,
                  "topics",
                  e.target.value
                )
              }
            />

          </div>

        )
      )}

      <button
        className="add-btn"
        onClick={addLesson}
      >
        + Add Lesson
      </button>

      <button
        className="publish-btn"
        onClick={publishCourse}
      >
        Publish Course
      </button>

    </div>
  );
}

export default PostCourse;