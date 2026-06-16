require("dotenv").config();
const authRoutes = require("./routes/authRoutes");

const express = require("express");
const cors = require("cors");

const db = require("./config/db");
const courseRoutes = require("./routes/courseRoutes");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();
const enrollmentRoutes = require("./routes/enrollmentRoutes");

console.log("server.js started");

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Course Tracker API Running");
});
app.get(
  "/api/profile",
  authMiddleware,
  (req, res) => {
    res.json({
      message: "Protected Route",
      user: req.user
    });
  }
);

app.use("/api/courses", courseRoutes);
app.use("/api/enrollments", enrollmentRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});