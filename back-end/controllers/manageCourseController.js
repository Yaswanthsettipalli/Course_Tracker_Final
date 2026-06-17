const db = require("../config/db");

const getMyCourses = (req, res) => {

  const userId = req.user.id;

  const sql = `
    SELECT *
    FROM courses
    WHERE created_by = ?
    ORDER BY id DESC
  `;

  db.query(
    sql,
    [userId],
    (err, result) => {

      if(err){
        return res.status(500).json(err);
      }

      res.json(result);

    }
  );
};

module.exports = {
  getMyCourses
};
const deleteCourse = (req, res) => {

  const courseId =
    req.params.id;

  const userId =
    req.user.id;

  const sql = `
    SELECT *
    FROM courses
    WHERE id = ?
  `;

  db.query(
    sql,
    [courseId],
    (err, result) => {

      if(err){
        return res.status(500).json(err);
      }

      if(result.length === 0){
        return res.status(404).json({
          message:
          "Course Not Found"
        });
      }

      if(
        result[0].created_by !==
        userId
      ){
        return res.status(403).json({
          message:
          "Not Authorized"
        });
      }

      db.query(
        "DELETE FROM courses WHERE id=?",
        [courseId],
        (deleteErr) => {

          if(deleteErr){
            return res
            .status(500)
            .json(deleteErr);
          }

          res.json({
            message:
            "Course Deleted"
          });

        }
      );

    }
  );
};
module.exports = {
  getMyCourses,
  deleteCourse
};