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
  (req, res, next) => {
    console.log(
      "CREATE COURSE ROUTE HIT"
    );
    next();
  },
  createCourse
);

module.exports = router;