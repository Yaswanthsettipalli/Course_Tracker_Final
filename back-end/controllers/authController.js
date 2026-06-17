const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* =========================
   REGISTER
========================= */

const register = async (req, res) => {
  try {

    const {
      name,
      email,
      password
    } = req.body;

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    const sql =
      `
      INSERT INTO users
      (
        name,
        email,
        password
      )
      VALUES (?, ?, ?)
      `;

    db.query(
      sql,
      [
        name,
        email,
        hashedPassword
      ],
      (err) => {

        if (err) {

          console.error(err);

          return res.status(500).json({
            message: "Database Error"
          });

        }

        res.status(201).json({
          message:
            "User registered successfully"
        });

      }
    );

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });

  }
};

/* =========================
   LOGIN
========================= */

const login = (req, res) => {

  const {
    email,
    password
  } = req.body;

  db.query(
    `
    SELECT *
    FROM users
    WHERE email = ?
    `,
    [email],
    async (err, results) => {

      if (err) {

        return res.status(500).json({
          message: "Database Error"
        });

      }

      if (results.length === 0) {

        return res.status(404).json({
          message: "User not found"
        });

      }

      const user = results[0];

      const isMatch =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!isMatch) {

        return res.status(401).json({
          message:
            "Invalid credentials"
        });

      }

      const token = jwt.sign(
        {
          id: user.id,
          role: user.role
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d"
        }
      );

      res.json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });

    }
  );

};

/* =========================
   GET PROFILE
========================= */

const getProfile = (req, res) => {

  const userId =
    req.user.id;

  db.query(
    `
    SELECT
      id,
      name,
      email
    FROM users
    WHERE id = ?
    `,
    [userId],
    (err, result) => {

      if (err) {

        return res
          .status(500)
          .json(err);

      }

      if (
        result.length === 0
      ) {

        return res
          .status(404)
          .json({
            message:
              "User not found"
          });

      }

      res.json(
        result[0]
      );

    }
  );

};

/* =========================
   UPDATE PROFILE
========================= */

const updateProfile = (
  req,
  res
) => {

  const userId =
    req.user.id;

  const { name } =
    req.body;

  if (!name) {

    return res
      .status(400)
      .json({
        message:
          "Name is required"
      });

  }

  db.query(
    `
    UPDATE users
    SET name = ?
    WHERE id = ?
    `,
    [
      name,
      userId
    ],
    (err) => {

      if (err) {

        console.error(
          "Profile Update Error:",
          err
        );

        return res
          .status(500)
          .json({
            message:
              "Failed to update profile"
          });

      }

      res.json({
        message:
          "Profile Updated Successfully"
      });

    }
  );

};

/* =========================
   CHANGE PASSWORD
========================= */

/* =========================
   CHANGE PASSWORD
========================= */

const changePassword = async (req, res) => {

  const userId = req.user.id;

  const {
    currentPassword,
    newPassword
  } = req.body;

  if (
    !currentPassword ||
    !newPassword
  ) {
    return res
      .status(400)
      .json({
        message:
          "All fields are required"
      });
  }

  if (
    newPassword.length < 6
  ) {
    return res
      .status(400)
      .json({
        message:
          "Password must be at least 6 characters"
      });
  }

  db.query(
    `
    SELECT *
    FROM users
    WHERE id = ?
    `,
    [userId],
    async (
      err,
      result
    ) => {

      if (err) {
        console.error(err);

        return res
          .status(500)
          .json({
            message:
              "Database Error"
          });
      }

      if (
        result.length === 0
      ) {
        return res
          .status(404)
          .json({
            message:
              "User not found"
          });
      }

      const user =
        result[0];

      const isMatch =
        await bcrypt.compare(
          currentPassword,
          user.password
        );

      if (!isMatch) {
        return res
          .status(400)
          .json({
            message:
              "Current Password Incorrect"
          });
      }

      const hashedPassword =
        await bcrypt.hash(
          newPassword,
          10
        );

      db.query(
        `
        UPDATE users
        SET password = ?
        WHERE id = ?
        `,
        [
          hashedPassword,
          userId
        ],
        (
          updateErr
        ) => {

          if (
            updateErr
          ) {
            console.error(
              updateErr
            );

            return res
              .status(500)
              .json({
                message:
                  "Failed to update password"
              });
          }

          res.json({
            message:
              "Password Updated Successfully"
          });

        }
      );

    }
  );

};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword
};