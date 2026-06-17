const db = require("../config/db");

const getDashboardStats = (req, res) => {

  const userId = req.user.id;

  const stats = {};

  db.query(
    `
    SELECT COUNT(*) AS totalCourses
    FROM courses
    `,
    (err, courseResult) => {

      if (err)
        return res.status(500).json(err);

      stats.totalCourses =
        courseResult[0].totalCourses;

      db.query(
        `
        SELECT COUNT(*) AS enrolledCourses
        FROM enrollments
        WHERE user_id = ?
        `,
        [userId],
        (err, enrollResult) => {

          if (err)
            return res.status(500).json(err);

          stats.enrolledCourses =
            enrollResult[0].enrolledCourses;

          db.query(
            `
            SELECT COUNT(*) AS totalLessons
            FROM lessons l
            JOIN enrollments e
            ON l.course_id = e.course_id
            WHERE e.user_id = ?
            `,
            [userId],
            (err, lessonResult) => {

              if (err)
                return res.status(500).json(err);

              stats.totalLessons =
                lessonResult[0].totalLessons;

              db.query(
                `
                SELECT COUNT(*) AS completedLessons
                FROM progress
                WHERE user_id = ?
                `,
                [userId],
                (err, progressResult) => {

                  if (err)
                    return res.status(500).json(err);

                  const completed =
                    progressResult[0]
                      .completedLessons;

                  const total =
                    stats.totalLessons;

                  stats.progress =
                    total === 0
                      ? 0
                      : Math.round(
                          (completed / total) * 100
                        );

                  res.json(stats);

                }
              );

            }
          );

        }
      );

    }
  );

};

module.exports = {
  getDashboardStats
};