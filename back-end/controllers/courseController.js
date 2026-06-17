const db = require("../config/db");

/* =========================
   GET ALL COURSES
========================= */

const getCourses = (req, res) => {

  const userId =
    req.user?.id || null;

  const sql = `
    SELECT *
    FROM courses
  `;

  db.query(
    sql,
    async (err, courses) => {

      if (err) {
        return res
          .status(500)
          .json(err);
      }

      try {

        const updatedCourses =
          await Promise.all(

            courses.map(
              (course) => {

                return new Promise(
                  (resolve, reject) => {

                    db.query(
                      `
                      SELECT COUNT(*) AS totalLessons
                      FROM lessons
                      WHERE course_id = ?
                      `,
                      [course.id],
                      (
                        totalErr,
                        totalResult
                      ) => {

                        if (totalErr) {
                          return reject(
                            totalErr
                          );
                        }

                        const totalLessons =
                          totalResult[0]
                            .totalLessons;

                        db.query(
                          `
                          SELECT COUNT(*) AS completedLessons
                          FROM progress p
                          JOIN lessons l
                          ON p.lesson_id = l.id
                          WHERE
                          l.course_id = ?
                          ${
                            userId
                              ? "AND p.user_id = ?"
                              : ""
                          }
                          `,
                          userId
                            ? [
                                course.id,
                                userId
                              ]
                            : [
                                course.id
                              ],
                          (
                            progressErr,
                            progressResult
                          ) => {

                            if (
                              progressErr
                            ) {
                              return reject(
                                progressErr
                              );
                            }

                            const completedLessons =
                              progressResult[0]
                                .completedLessons;

                            let progress = 0;

                            if (
                              userId &&
                              totalLessons > 0
                            ) {
                              progress =
                                Math.round(
                                  (
                                    completedLessons /
                                    totalLessons
                                  ) *
                                    100
                                );
                            }

                            resolve({
                              ...course,
                              progress,
                              total_lessons:
                                totalLessons
                            });

                          }
                        );

                      }
                    );

                  }
                );

              }
            )

          );

        res.json(
          updatedCourses
        );

      } catch (error) {

        res
          .status(500)
          .json(error);

      }

    }
  );

};

/* =========================
   GET COURSE BY ID
========================= */

const getCourseById = (
  req,
  res
) => {

  const courseId =
    req.params.id;

  const sql = `
    SELECT *
    FROM courses
    WHERE id = ?
  `;

  db.query(
    sql,
    [courseId],
    (
      err,
      courseResult
    ) => {

      if (err) {
        return res
          .status(500)
          .json(err);
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
        (
          lessonErr,
          lessonResult
        ) => {

          if (
            lessonErr
          ) {
            return res
              .status(500)
              .json(
                lessonErr
              );
          }

          res.json({
            course:
              courseResult[0],
            lessons:
              lessonResult
          });

        }
      );

    }
  );

};

/* =========================
   UPDATE COURSE
========================= */

const updateCourse = (
  req,
  res
) => {

  const courseId =
    req.params.id;

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
        (
          deleteErr
        ) => {

          if (
            deleteErr
          ) {
            return res
              .status(500)
              .json(
                deleteErr
              );
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
                lesson.content ||
                  "",
                lesson.video_url ||
                  "",
                index + 1
              ]
            );

          db.query(
            insertLessonSql,
            [
              lessonValues
            ],
            (
              lessonErr
            ) => {

              if (
                lessonErr
              ) {
                return res
                  .status(500)
                  .json(
                    lessonErr
                  );
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
  getCourses,
  getCourseById,
  updateCourse
};