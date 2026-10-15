
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [user, setUser] = useState({});
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    year: "",
    course: "",
    interest: "",
    learningMode: "",
    skillLevel: "",
    profileImage: "",
  });

  useEffect(() => {
    let savedUser = {};

    try {
      savedUser = JSON.parse(localStorage.getItem("user") || "{}");

      if (!savedUser || typeof savedUser !== "object") {
        savedUser = {};
      }
    } catch {
      savedUser = {};
    }

    if (!savedUser.name) {
      savedUser.name = localStorage.getItem("userName") || "";
    }

    setUser(savedUser);

    setFormData((previous) => ({
      ...previous,
      ...savedUser,
      profileImage: savedUser.profileImage || "",
    }));

    // Fetch live profile from MySQL
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:5000/api/users/profile", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.user) {
            setUser((prev) => ({ ...prev, ...data.user }));
            setFormData((prev) => ({
              ...prev,
              ...data.user,
              profileImage: prev.profileImage || savedUser.profileImage || "",
            }));
            localStorage.setItem("user", JSON.stringify({ ...savedUser, ...data.user }));
          }
        })
        .catch((err) => console.error("Profile fetch error:", err));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Select and preview profile photo
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage("Please select a valid image.");
      e.target.value = "";
      return;
    }

    // Limit image size to 5 MB before processing.
    if (file.size > 5 * 1024 * 1024) {
      setMessage("Please choose an image smaller than 5 MB.");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const image = new Image();

      image.onload = () => {
        const canvas = document.createElement("canvas");
        const maxSize = 400;

        const scale = Math.min(
          maxSize / image.width,
          maxSize / image.height,
          1
        );

        canvas.width = Math.round(image.width * scale);
        canvas.height = Math.round(image.height * scale);

        const context = canvas.getContext("2d");

        if (!context) {
          setMessage("Unable to process this image.");
          return;
        }

        context.drawImage(image, 0, 0, canvas.width, canvas.height);

        const compressedImage = canvas.toDataURL("image/jpeg", 0.78);

        setFormData((previous) => ({
          ...previous,
          profileImage: compressedImage,
        }));

        setMessage("Photo selected. Click Save Changes to keep it.");
      };

      image.onerror = () => {
        setMessage("Unable to load this image. Try another photo.");
      };

      image.src = reader.result;
    };

    reader.onerror = () => {
      setMessage("Unable to read this image. Please try again.");
    };

    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setFormData((previous) => ({
      ...previous,
      profileImage: "",
    }));

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    setMessage("Photo removed. Click Save Changes to confirm.");
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        const response = await fetch("http://localhost:5000/api/users/profile", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: formData.name,
            department: formData.department,
            year: formData.year,
            course: formData.course,
            interest: formData.interest,
            learningMode: formData.learningMode,
            skillLevel: formData.skillLevel,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          setMessage(data.message || "Failed to update profile in database.");
          return;
        }

        const updatedUser = {
          ...user,
          ...data.user,
          profileImage: formData.profileImage,
        };

        localStorage.setItem("user", JSON.stringify(updatedUser));
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));
        if (updatedUser.name) {
          localStorage.setItem("userName", updatedUser.name);
        }

        setUser(updatedUser);
        setFormData(updatedUser);
        setEditing(false);
        setMessage("Profile updated successfully in MySQL!");
      } else {
        const updatedUser = {
          ...user,
          ...formData,
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        setEditing(false);
        setMessage("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Profile save error:", error);
      setMessage("Unable to save. Please check backend connection.");
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user.name || "",
      email: user.email || "",
      department: user.department || "",
      year: user.year || "",
      course: user.course || "",
      interest: user.interest || "",
      learningMode: user.learningMode || "",
      skillLevel: user.skillLevel || "",
      profileImage: user.profileImage || "",
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    setEditing(false);
    setMessage("");
  };

  const getInitials = (name) => {
    if (!name) return "U";

    return name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join("");
  };

  const profileFields = [
    { label: "Full Name", name: "name", placeholder: "Enter your name" },
    { label: "Email Address", name: "email", placeholder: "Enter your email" },
    {
      label: "Department",
      name: "department",
      placeholder: "Enter your department",
    },
    { label: "Year", name: "year", placeholder: "Enter your year" },
    { label: "Course", name: "course", placeholder: "Enter your course" },
    {
      label: "Area of Interest",
      name: "interest",
      placeholder: "Enter your interest",
    },
    {
      label: "Learning Mode",
      name: "learningMode",
      placeholder: "Enter your learning mode",
    },
    {
      label: "Skill Level",
      name: "skillLevel",
      placeholder: "Enter your skill level",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userName");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    navigate("/Login");
  };

  return (
    <div className="profile-page">
      {/* SIDEBAR */}
      <aside className="user-sidebar">
        <div className="user-brand">
          <div className="user-brand-icon">E</div>
          <div>
            <h2>EventFlow</h2>
            <span>Learn. Explore. Grow.</span>
          </div>
        </div>

        <div className="user-sidebar-label">MAIN MENU</div>

        <button className="user-nav-item" onClick={() => navigate("/Dashboard")}>
          <span>▦</span> Dashboard
        </button>

        <button className="user-nav-item" onClick={() => navigate("/Events")}>
          <span>✦</span> Explore Events
        </button>

        <button
          className="user-nav-item"
          onClick={() => navigate("/MyRegistration")}
        >
          <span>▣</span> My Registrations
        </button>

        <button className="user-nav-item" onClick={() => navigate("/learning")}>
          <span>⌘</span> Learning Path
        </button>

        <button className="user-nav-item" onClick={() => navigate("/my-quiz")}>
          <span>✓</span> My Quiz
        </button>

        <button className="user-nav-item" onClick={() => navigate("/ReminderCenter")}>
          <span>♧</span> Reminders
        </button>

        <button
          className="user-nav-item"
          onClick={() => navigate("/my-certificates")}
        >
          <span>★</span> My Certificates
        </button>

        <div className="user-sidebar-bottom">
          <button
            className="user-nav-item active"
            onClick={() => navigate("/Profile")}
          >
            <span>⚙</span> My Profile
          </button>

          <button className="user-nav-item logout-item" onClick={handleLogout}>
            <span>⇥</span> Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="profile-main">
        {/* TOP BAR */}
        <div className="profile-topbar">
          <div>
            <p className="profile-eyebrow">YOUR PERSONAL SPACE</p>
            <h1>My Profile</h1>
            <p className="profile-subtitle">
              Manage your personal information and learning preferences.
            </p>
          </div>

          <button
            type="button"
            className="profile-reminder-btn"
            onClick={() => navigate("/Reminder")}
          >
            ♧ Reminders
          </button>
        </div>

        {/* PROFILE BANNER */}
        <section className="profile-banner">
          <div className="profile-avatar">
            {formData.profileImage ? (
              <img src={formData.profileImage} alt="Profile" />
            ) : (
              <div className="profile-avatar-initials">
                {getInitials(formData.name)}
              </div>
            )}
          </div>

          <div className="profile-banner-info">
            <span className="profile-member-tag">EVENTFLOW MEMBER</span>
            <h2>{formData.name || "Your Name"}</h2>
            <p>{formData.email || "Add your email address"}</p>

            <div className="profile-banner-tags">
              <span>{formData.course || "Course not added"}</span>
              <span>{formData.year || "Year not added"}</span>
            </div>
          </div>

          <div className="profile-banner-icon">✦</div>
        </section>

        {/* PROFILE DETAILS */}
        <section className="profile-details-card">
          <div className="profile-section-heading">
            <div>
              <h2>Personal Information</h2>
              <p>Your account and educational details</p>
            </div>

            {!editing && (
              <button
                type="button"
                className="profile-edit-btn"
                onClick={() => {
                  setEditing(true);
                  setMessage("");
                }}
              >
                ✎ Edit Profile
              </button>
            )}
          </div>

          {message && (
            <div className="profile-message" role="status">
              {message}
            </div>
          )}

          {/* PHOTO EDITOR */}
          {editing && (
            <div className="profile-photo-editor">
              <div className="profile-photo-preview">
                {formData.profileImage ? (
                  <img src={formData.profileImage} alt="Selected profile" />
                ) : (
                  <span>{getInitials(formData.name)}</span>
                )}
              </div>

              <div className="profile-photo-controls">
                <h3>Profile Photo</h3>
                <p>Choose a photo from your computer.</p>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  id="profileImageInput"
                  className="profile-image-input"
                  onChange={handleImageChange}
                />

                <div className="profile-photo-buttons">
                  <label
                    htmlFor="profileImageInput"
                    className="profile-choose-photo-btn"
                  >
                    📷 Choose Photo
                  </label>

                  {formData.profileImage && (
                    <button
                      type="button"
                      className="profile-remove-photo-btn"
                      onClick={handleRemoveImage}
                    >
                      Remove Photo
                    </button>
                  )}
                </div>

                <small>JPG, PNG or other image formats. Maximum 5 MB.</small>
              </div>
            </div>
          )}

          <div className="profile-fields-grid">
            {profileFields.map((field) => (
              <div className="profile-field" key={field.name}>
                <label htmlFor={field.name}>{field.label}</label>

                {editing ? (
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.name === "email" ? "email" : "text"}
                    placeholder={field.placeholder}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                  />
                ) : (
                  <div className="profile-field-value">
                    {formData[field.name] || "Not provided"}
                  </div>
                )}
              </div>
            ))}
          </div>

          {editing && (
            <div className="profile-actions">
              <button
                type="button"
                className="profile-cancel-btn"
                onClick={handleCancel}
              >
                Cancel
              </button>

              <button
                type="button"
                className="profile-save-btn"
                onClick={handleSave}
              >
                Save Changes
              </button>
            </div>
          )}
        </section>

        {/* ACCOUNT INFORMATION */}
        <section className="profile-account-card">
          <div className="profile-account-icon">♙</div>

          <div className="profile-account-info">
            <h3>Account Information</h3>
            <p>
              Your EventFlow account is ready for event registration and
              learning activities.
            </p>
          </div>

          <span className="profile-account-status">My Account</span>
        </section>
      </main>
    </div>
  );
}

export default Profile;
