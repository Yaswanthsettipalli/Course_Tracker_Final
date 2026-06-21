const db = require("../config/db");

const getLessons = (req, res) => {

  const { courseId } = req.params;

 const sql = `
SELECT
  lessons.*,
  courses.title AS course_title
FROM lessons
JOIN courses
ON lessons.course_id = courses.id
WHERE lessons.course_id = ?
ORDER BY lessons.order_index
`;

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