const db = require("../config/db");

const getLessons = (req, res) => {

  const { courseId } = req.params;

  const sql =
  `SELECT *
   FROM lessons
   WHERE course_id = ?
   ORDER BY order_index`;

  db.query(
    sql,
    [courseId],
    (err, results) => {

      if(err){
        return res.status(500).json(err);
      }

      res.json(results);
    }
  );
};

module.exports = { getLessons };