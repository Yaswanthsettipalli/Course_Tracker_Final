const db = require("../config/db");

const markLessonComplete =
(req, res) => {

  const userId =
    req.user.id;

  const lessonId =
    req.params.lessonId;

  const sql = `
    INSERT IGNORE INTO progress
    (
      user_id,
      lesson_id
    )
    VALUES (?,?)
  `;

  db.query(
    sql,
    [
      userId,
      lessonId
    ],
    (err) => {

      if(err){
        return res
        .status(500)
        .json(err);
      }

      res.json({
        message:
        "Lesson Completed"
      });

    }
  );
};

module.exports = {
  markLessonComplete
};