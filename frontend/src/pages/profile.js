import React, { useState } from "react";
import "../components/css/profile.css";

function ProfilePage() {
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    role: "Developer"
  });
  const [isEditable, setIsEditable] = useState(false);

  const handleUpdate = () => {
    setIsEditable(!isEditable);
    // Add your update logic here
  };
  return (
    <div className="profile-container">
      <div className="profile-card">
        <header className="profile-header">
          <h1>My Profile</h1>
        </header>
        <div className="profile-content">
        <div className="profile-left">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOH2aZnIHWjMQj2lQUOWIL2f4Hljgab0ecZQ&s"
              alt="Profile"
              className="profile-image"
            />
            <h2>{`${profile.firstName} ${profile.lastName}`}</h2>
            <p className="role">{profile.role}</p>
            <div className="social-links">
              <a href="#" className="social-link">
                LinkedIn
              </a>
              <a href="#" className="social-link">
                Twitter
              </a>
              <a href="#" className="social-link">
                GitHub
              </a>
            </div>
            <button onClick={handleUpdate} className="edit-btn">
              {isEditable ? "Save" : "Edit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
