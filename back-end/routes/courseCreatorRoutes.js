const express =
require("express");

const router =
express.Router();

const authMiddleware =
require("../middleware/authMiddleware");

const {
  createCourse
} =
require(
"../controllers/courseCreatorController"
);

router.post(
  "/",
  authMiddleware,
  createCourse
);

module.exports = router;