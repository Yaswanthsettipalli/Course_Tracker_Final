    const db = require("../config/db");

    const getCourseById = (req, res) => {

    const courseId = req.params.id;

    const sql = `
        SELECT *
        FROM courses
        WHERE id = ?
    `;

    db.query(
        sql,
        [courseId],
        (err, courseResult) => {

        if(err){
            return res.status(500).json(err);
        }

        const lessonSql = `
            SELECT *
            FROM lessons
            WHERE course_id = ?
            ORDER BY order_index
        `;

        db.query(
            lessonSql,
            [courseId],
            (lessonErr, lessonResult) => {

            if(lessonErr){
                return res.status(500).json(lessonErr);
            }

            res.json({
                course: courseResult[0],
                lessons: lessonResult
            });

            }
        );

        }
    );
    };

    const updateCourse = (req, res) => {

  const courseId = req.params.id;

  const {
    title,
    description,
    category,
    lessons
  } = req.body;

  const updateCourseSql = `
    UPDATE courses
    SET
      title = ?,
      description = ?,
      category = ?
    WHERE id = ?
  `;

  db.query(
    updateCourseSql,
    [
      title,
      description,
      category,
      courseId
    ],
    (err) => {

      if (err) {
        return res
          .status(500)
          .json(err);
      }

      const deleteLessonsSql = `
        DELETE FROM lessons
        WHERE course_id = ?
      `;

      db.query(
        deleteLessonsSql,
        [courseId],
        (deleteErr) => {

          if (deleteErr) {
            return res
              .status(500)
              .json(deleteErr);
          }

          if (
            !lessons ||
            lessons.length === 0
          ) {
            return res.json({
              message:
                "Course Updated Successfully"
            });
          }

          const insertLessonSql = `
  INSERT INTO lessons
  (
    course_id,
    title,
    content,
    video_url,
    order_index,
    notes_pdf,
    cheatsheet_pdf,
    source_code_pdf,
    assignment_pdf
  )
  VALUES ?
`;

          const lessonValues =
  lessons.map(
    (
      lesson,
      index
    ) => [
      courseId,
      lesson.title,
      lesson.content || "",
      lesson.video_url || "",
      index + 1,
      lesson.notes_pdf || "",
      lesson.cheatsheet_pdf || "",
      lesson.source_code_pdf || "",
      lesson.assignment_pdf || ""
    ]
  );

          db.query(
            insertLessonSql,
            [lessonValues],
            (lessonErr) => {

              if (lessonErr) {
                return res
                  .status(500)
                  .json(lessonErr);
              }

              res.json({
                message:
                  "Course Updated Successfully"
              });

            }
          );

        }
      );

    }
  );
};

    module.exports = {
    getCourseById,
    updateCourse
    };