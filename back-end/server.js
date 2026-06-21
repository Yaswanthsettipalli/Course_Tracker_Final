const lessonRoutes = require("./routes/lessonRoutes");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");

const express = require("express");
const cors = require("cors");

const db = require("./config/db");
const courseRoutes = require("./routes/courseRoutes");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();
const enrollmentRoutes = require("./routes/enrollmentRoutes");
const courseCreatorRoutes =
require(
"./routes/courseCreatorRoutes"
);
const manageCourseRoutes =
require(
"./routes/manageCourseRoutes"
);
const updateCourseRoutes =
require(
"./routes/updateCourseRoutes"
)
const dashboardRoutes =
require(
"./routes/dashboardRoutes"
);
const progressRoutes =
require(
"./routes/progressRoutes"
);

console.log("server.js started");

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://course-tracker-final-5w23-git-main-yaswanths-projects-e220f093.vercel.app"
    ],
    credentials: true
  })
);
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use(
  "/api/lessons",
  lessonRoutes
);
app.use(
  "/api/progress",
  progressRoutes
);
app.use(
  "/api/dashboard",
  dashboardRoutes
);
app.use(
  "/api/manage-courses",
  manageCourseRoutes
);
app.use(
  "/api/update-course",
  updateCourseRoutes
);
app.use(
  "/api/create-course",
  courseCreatorRoutes
);
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