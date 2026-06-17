const express =
require("express");

const router =
express.Router();

const authMiddleware =
require("../middleware/authMiddleware");

const {
  getMyCourses,
  deleteCourse
} =
require(
"../controllers/manageCourseController"
);

router.get(
  "/my-courses",
  authMiddleware,
  getMyCourses
);

router.delete(
  "/:id",
  authMiddleware,
  deleteCourse
);

module.exports = router;