const db = require("../config/db");

/* =========================
   ENROLL COURSE
========================= */

const enrollCourse = (req, res) => {

  const { courseId } = req.body;

  const userId = req.user.id;

  const sql =
    `
    INSERT INTO enrollments
    (
      user_id,
      course_id
    )
    VALUES (?, ?)
    `;

  db.query(
    sql,
    [userId, courseId],
    (err, result) => {

      if (err) {

        console.error(
          "Enrollment Error:",
          err
        );

        if (
          err.code ===
          "ER_DUP_ENTRY"
        ) {

          return res
            .status(400)
            .json({
              message:
                "Already enrolled in this course"
            });

        }

        return res
          .status(500)
          .json({
            message:
              "Enrollment failed"
          });

      }

      res.status(201).json({
        message:
          "Successfully enrolled"
      });

    }
  );

};

/* =========================
   GET MY ENROLLMENTS
========================= */

const getMyEnrollments =
  (req, res) => {

  const userId =
    req.user.id;

  const sql =
    `
    SELECT
      course_id
    FROM enrollments
    WHERE user_id = ?
    `;

  db.query(
    sql,
    [userId],
    (err, result) => {

      if (err) {

        console.error(
          "Enrollment Fetch Error:",
          err
        );

        return res
          .status(500)
          .json({
            message:
              "Failed to fetch enrollments"
          });

      }

      res.json(
        result
      );

    }
  );

};

module.exports = {
  enrollCourse,
  getMyEnrollments
};