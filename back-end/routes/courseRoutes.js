const express = require("express");
const router = express.Router();

const authMiddleware =
require("../middleware/authMiddleware");

const {
  getCourses,
  getCourseById,
  updateCourse
} =
require("../controllers/courseController");

/* =========================
   GET ALL COURSES
========================= */

router.get(
  "/",
  getCourses
);

/* =========================
   GET COURSE BY ID
========================= */

router.get(
  "/:id",
  getCourseById
);

/* =========================
   UPDATE COURSE
========================= */

router.put(
  "/update-course/:id",
  authMiddleware,
  updateCourse
);

module.exports = router;