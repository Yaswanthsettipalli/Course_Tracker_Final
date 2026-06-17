const express =
require("express");

const router =
express.Router();

const authMiddleware =
require("../middleware/authMiddleware");

const {
  getCourseById,
  updateCourse
} =
require(
"../controllers/updateCourseController"
);

router.get(
  "/:id",
  authMiddleware,
  getCourseById
);

router.put(
  "/:id",
  authMiddleware,
  updateCourse
);

module.exports = router;