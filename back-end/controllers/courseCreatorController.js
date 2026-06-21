const db = require("../config/db");

const createCourse = (req, res) => {

  const {
    title,
    description,
    category,
    lessons
  } = req.body;

  const created_by = req.user.id;

  const courseSql = `
    INSERT INTO courses
    (
      title,
      description,
      category,
      created_by
    )
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    courseSql,
    [
      title,
      description,
      category,
      created_by
    ],
    (err, result) => {

      if (err) {
        return res
          .status(500)
          .json(err);
      }

      const courseId =
        result.insertId;

      const lessonSql = `
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
    (lesson, index) => [
      courseId,
      lesson.title,
      lesson.notes,
      lesson.video_url,
      index + 1,
      lesson.notes_pdf,
      lesson.cheatsheet_pdf,
      lesson.source_code_pdf,
      lesson.assignment_pdf
    ]
  );

      db.query(
        lessonSql,
        [lessonValues],
        (lessonErr) => {

          if (lessonErr) {
            return res
              .status(500)
              .json(
                lessonErr
              );
          }

          res.status(201).json({
            message:
              "Course Created Successfully"
          });

        }
      );

    }
  );
};
console.log(
  "LESSON VALUES:",
  lessonValues
);

module.exports = {
  createCourse
};