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
          order_index
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
            lesson.notes,
            lesson.video_url,
            index + 1
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

module.exports = {
  createCourse
};