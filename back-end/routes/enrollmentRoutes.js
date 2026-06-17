const express = require("express");

const router = express.Router();

const authMiddleware =
require("../middleware/authMiddleware");

const {
  enrollCourse,
  getMyEnrollments
} =
require("../controllers/enrollmentController");

/* =========================
   ENROLL COURSE
========================= */

router.post(
  "/",
  authMiddleware,
  enrollCourse
);

/* =========================
   GET MY ENROLLED COURSES
========================= */

router.get(
  "/my-courses",
  authMiddleware,
  getMyEnrollments
);

module.exports = router;