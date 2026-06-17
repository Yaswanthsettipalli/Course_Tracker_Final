import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/Settings.css";

function Settings() {

  const navigate = useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [isEditing, setIsEditing] =
    useState(false);

  const [
    currentPassword,
    setCurrentPassword
  ] = useState("");

  const [
    newPassword,
    setNewPassword
  ] = useState("");

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {

    const fetchProfile =
      async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await api.get(
            "/auth/profile",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        console.log(
          "Profile Data:",
          res.data
        );

        setName(
          res.data.name || ""
        );

        setEmail(
          res.data.email || ""
        );

      } catch (error) {

        console.error(
          "PROFILE ERROR:",
          error.response?.data
        );

        alert(
          error.response?.data?.message ||
          "Failed To Load Profile"
        );

      }

    };

    fetchProfile();

  }, []);

  const updateProfile =
    async () => {

    if (!name.trim()) {

      alert(
        "Name cannot be empty"
      );

      return;

    }

    try {

      setLoading(true);

      const token =
        localStorage.getItem(
          "token"
        );

      await api.put(
        "/auth/profile",
        {
          name
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      setIsEditing(false);

      alert(
        "Profile Updated Successfully ✅"
      );

    } catch (error) {

      console.error(
        error.response?.data
      );

      alert(
        error.response?.data?.message ||
        "Failed To Update Profile"
      );

    } finally {

      setLoading(false);

    }

  };

  const updatePassword =
    async () => {

    if (
      !currentPassword ||
      !newPassword
    ) {

      alert(
        "Please fill all fields"
      );

      return;

    }

    if (
      newPassword.length < 6
    ) {

      alert(
        "Password must be at least 6 characters"
      );

      return;

    }

    try {

      setLoading(true);

      const token =
        localStorage.getItem(
          "token"
        );

      await api.put(
        "/auth/password",
        {
          currentPassword,
          newPassword
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      alert(
        "Password Updated Successfully 🔐"
      );

      setCurrentPassword("");
      setNewPassword("");

    } catch (error) {

      console.error(
        error.response?.data
      );

      alert(
        error.response?.data?.message ||
        "Failed To Update Password"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="settings-page">

      <div className="settings-container">

        <button
          className="back-btn"
          onClick={() =>
            navigate("/courses")
          }
        >
          ← Back
        </button>

        <h1 className="settings-title">
          ⚙️ Account Settings
        </h1>

        {/* PROFILE */}

        <div className="settings-card profile-card">

          <h2>
            Profile Information
          </h2>

          <div className="settings-group">

            <label>
              Full Name
            </label>

            <div
              style={{
                display: "flex",
                gap: "10px"
              }}
            >

              <input
                type="text"
                value={name}
                disabled={!isEditing}
                onChange={(e) =>
                  setName(
                    e.target.value
                  )
                }
                style={{
                  flex: 1
                }}
              />

              <button
                className="settings-btn"
                type="button"
                onClick={() =>
                  setIsEditing(
                    !isEditing
                  )
                }
              >
                {isEditing
                  ? "Cancel"
                  : "Edit"}
              </button>

            </div>

          </div>

          <div className="settings-group">

            <label>
              Email Address
            </label>

            <input
              type="email"
              value={email}
              disabled
              style={{
                cursor:
                  "not-allowed",
                opacity: 0.7
              }}
            />

          </div>

          <button
            className="settings-btn"
            onClick={
              updateProfile
            }
            disabled={
              loading
            }
          >
            Save Profile
          </button>

        </div>

        {/* PASSWORD */}

        <div className="settings-card password-card">

          <h2>
            Change Password
          </h2>

          <div className="settings-group">

            <label>
              Current Password
            </label>

            <input
              type="password"
              value={
                currentPassword
              }
              onChange={(e) =>
                setCurrentPassword(
                  e.target.value
                )
              }
              placeholder="Enter Current Password"
            />

          </div>

          <div className="settings-group">

            <label>
              New Password
            </label>

            <input
              type="password"
              value={newPassword}
              onChange={(e) =>
                setNewPassword(
                  e.target.value
                )
              }
              placeholder="Enter New Password"
            />

          </div>

          <button
            className="settings-btn"
            onClick={
              updatePassword
            }
            disabled={
              loading
            }
          >
            Change Password
          </button>

        </div>

      </div>

    </div>

  );

}

export default Settings;