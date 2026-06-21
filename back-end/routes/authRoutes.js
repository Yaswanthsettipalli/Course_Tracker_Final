const express = require("express");
const router = express.Router();

const authMiddleware =
require("../middleware/authMiddleware");

const {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword
} =
require("../controllers/authController");
const {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword,
  forgotPassword
} =
require("../controllers/authController");
router.post(
  "/forgot-password",
  forgotPassword
);
router.post(
  "/login",
  login
);

router.post(
  "/register",
  register
);

router.post(
  "/login",
  login
);

router.get(
  "/profile",
  authMiddleware,
  getProfile
);

router.put(
  "/profile",
  authMiddleware,
  updateProfile
);

router.put(
  "/password",
  authMiddleware,
  changePassword
);


module.exports = router;