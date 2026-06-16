const db = require("../config/db");

const getCourses = (req, res) => {
  const query = "SELECT * FROM courses";

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database Error" });
    }

    res.json(results);
  });
};

module.exports = { getCourses };