const express =
require("express");

const router =
express.Router();

const authMiddleware =
require(
"../middleware/authMiddleware"
);

const {
  markLessonComplete
} =
require(
"../controllers/progressController"
);

router.post(
  "/:lessonId",
  authMiddleware,
  markLessonComplete
);

module.exports = router;