import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import "../styles/CourseLearning.css";

function CourseLearning() {
  const { courseId } = useParams();

  const [lessons, setLessons] =
    useState([]);

  const [selectedLesson, setSelectedLesson] =
    useState(null);

  const [showVideo, setShowVideo] =
    useState(false);

  const [completedLessons, setCompletedLessons] =
    useState([]);

  const [progress, setProgress] =
    useState(0);
    const [expandedLesson, setExpandedLesson] =
  useState(null);

  useEffect(() => {

    const fetchLessons = async () => {

      try {

        const res =
  await api.get(
    `/lessons/${courseId}`
  );

        setLessons(res.data);
        console.log("Lessons Data:", res.data);

        if (res.data.length > 0) {

          setSelectedLesson(
            res.data[0]
          );

        }

      } catch (error) {

        console.error(error);

      }

    };

    fetchLessons();

  }, [courseId]);

  useEffect(() => {

    if (lessons.length === 0)
      return;

    const percentage =
      Math.round(
        (
          completedLessons.length /
          lessons.length
        ) * 100
      );

    setProgress(
      percentage
    );

  }, [
    completedLessons,
    lessons
  ]);

  const markComplete =
    async () => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      await api.post(
        `/progress/${selectedLesson.id}`,
        {},
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      if (
        !completedLessons.includes(
          selectedLesson.id
        )
      ) {

        setCompletedLessons([
          ...completedLessons,
          selectedLesson.id
        ]);

      }

      alert(
        "Lesson Completed ✅"
      );

    } catch (error) {

      console.error(error);

    }

  };

  return (

    <div className="learning-page">

      {/* SIDEBAR */}

      <div className="learning-sidebar">

     <h2>
  {lessons[0]?.course_title ||
   "Course"}
</h2>

        <div className="progress-ring">

          <div
            className="progress-circle"
            style={{
              background:
                `conic-gradient(
                  #00C896
                  ${progress * 3.6}deg,
                  #1F2937 0deg
                )`
            }}
          >

            <div
              className="inner-circle"
            >
              {progress}%
            </div>

          </div>

          <p>
            Course Progress
          </p>

        </div>

       <div className="lesson-list">

  {lessons.map((lesson) => (

    <div key={lesson.id}>

      <div
        className={`lesson-item ${
          selectedLesson?.id === lesson.id
            ? "active-lesson"
            : ""
        }`}
        onClick={() => {

          setSelectedLesson(lesson);

          setExpandedLesson(
            expandedLesson === lesson.id
              ? null
              : lesson.id
          );

          setShowVideo(false);

        }}
      >

        <span>
          {completedLessons.includes(
            lesson.id
          )
            ? "🟢"
            : "📘"}
        </span>

        {lesson.title}

      </div>

      {expandedLesson === lesson.id && (

        <div className="lesson-resources">

          {lesson.notes_pdf && (
            <a
              href={lesson.notes_pdf}
              target="_blank"
              rel="noreferrer"
            >
              📄 Notes
            </a>
          )}

          {lesson.cheatsheet_pdf && (
            <a
              href={lesson.cheatsheet_pdf}
              target="_blank"
              rel="noreferrer"
            >
              📄 Cheat Sheet
            </a>
          )}

          {lesson.source_code_pdf && (
            <a
              href={lesson.source_code_pdf}
              target="_blank"
              rel="noreferrer"
            >
              💻 Source Code
            </a>
          )}

          {lesson.assignment_pdf && (
            <a
              href={lesson.assignment_pdf}
              target="_blank"
              rel="noreferrer"
            >
              📝 Assignment
            </a>
          )}

        </div>

      )}

    </div>

  ))}

</div>

      </div>

      {/* RIGHT SIDE */}

      <div className="lesson-content">

        {!selectedLesson ? (

          <h2>
            Loading Lessons...
          </h2>

        ) : !showVideo ? (

          <div className="lesson-overview">

            <h1>
              {selectedLesson.title}
            </h1>

            <h3>
              Progress:
              {" "}
              {completedLessons.includes(
                selectedLesson.id
              )
                ? "Completed ✅"
                : "Not Completed"}
            </h3>

            <p>
              {selectedLesson.content}
            </p>

            <div className="topics">

              <h4>
                Topics Covered
              </h4>

              <ul>
                <li>
                  Introduction
                </li>

                <li>
                  Concepts
                </li>

                <li>
                  Hands-on Practice
                </li>

                <li>
                  Summary
                </li>

              </ul>

            </div>

            <div className="resources">

  <h3>
    Resources
  </h3>

  {[
    {
      title: "📄 Lesson Notes",
      file: selectedLesson.notes_pdf
    },
    {
      title: "📄 Cheat Sheet",
      file: selectedLesson.cheatsheet_pdf
    },
    {
      title: "💻 Source Code",
      file: selectedLesson.source_code_pdf
    },
    {
      title: "📝 Assignment",
      file: selectedLesson.assignment_pdf
    }
  ].map((resource, index) => (

    <div
      key={index}
      className="resource-card"
    >

      <span>
        {resource.title}
      </span>

      <div className="resource-actions">

        {resource.file ? (

          <>

            <button
              className="resource-btn"
              onClick={() =>
                window.open(
                  resource.file,
                  "_blank"
                )
              }
            >
              View
            </button>

            <a
              href={resource.file}
              download
              className="resource-download"
            >
              ⬇ Download
            </a>

          </>

        ) : (

          <span
            style={{
              color: "#9CA3AF"
            }}
          >
            Not Available
          </span>

        )}

      </div>

    </div>

  ))}

</div>

            <button
              className="start-btn"
              onClick={() =>
                setShowVideo(true)
              }
            >
              Start Learning
            </button>

          </div>

        ) : (

          <div className="video-section">

            <h1>
              {selectedLesson.title}
            </h1>

            <iframe
              src={
                selectedLesson.video_url
              }
              title="lesson-video"
              allowFullScreen
            />

            <div className="lesson-actions">

              <button
                onClick={
                  markComplete
                }
              >
                Mark Complete
              </button>

              <button
                onClick={() => {

                  const currentIndex =
                    lessons.findIndex(
                      lesson =>
                        lesson.id ===
                        selectedLesson.id
                    );

                  if (
                    currentIndex <
                    lessons.length - 1
                  ) {

                    setSelectedLesson(
                      lessons[
                        currentIndex + 1
                      ]
                    );

                    setShowVideo(
                      false
                    );

                  }

                }}
              >
                Next Lesson
              </button>

            </div>

          </div>

        )}

      </div>

    </div>

  );
}

export default CourseLearning;