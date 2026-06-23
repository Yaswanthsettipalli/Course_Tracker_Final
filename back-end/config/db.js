console.log("DB FILE LOADED");
const mysql = require("mysql2");

const db = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

db.getConnection((err, connection) => {

  if (err) {
    console.error(
      "Database connection failed:",
      err
    );
    return;
  }

  console.log(
    "MySQL Connected"
  );

  connection.release();

});

console.log("EXPORTING DB:", typeof db);

module.exports = db;