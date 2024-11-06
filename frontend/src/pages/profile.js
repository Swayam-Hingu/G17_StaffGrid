
// export default ProfilePage;
import React, { useState } from "react";
// import './ProfilePage.css';  // Importing the CSS file
import "../components/css/profile.css";

function ProfilePage() {
  const [isEditable, setIsEditable] = useState(false);
  const [profile, setProfile] = useState({
    firstName: "Oliver",
    lastName: "Thompson",
    department: "Management",
    role: "General Manager",
    dob: "1980-01-01",
    note: "This is a sample note.",
    email: "oliver.thompson@example.com",
    phone: "123-456-7890",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    setIsEditable((prev) => !prev);
  };

  const formatDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <header className="profile-header">
          <h1>My Profile</h1>
        </header>

        <div className="profile-content">
          {/* Left side: Image, Role, and Social Links */}
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

          {/* Right side: Profile Details */}
          <div className="profile-right">
            <div className="form-group">
              <div className="gg">
                <input
                  type="text"
                  name="firstName"
                  value={profile.firstName}
                  onChange={handleChange}
                  disabled={!isEditable}
                  className={`input-field-firstname ${isEditable ? "enabled" : "disabled"}`}
                  placeholder="First Name"
                />
                <input
                  type="text"
                  name="lastName"
                  value={profile.lastName}
                  onChange={handleChange}
                  disabled={!isEditable}
                  className={`input-field-lastname ${isEditable ? "enabled" : "disabled"}`}
                  placeholder="Last Name"
                />
              </div>
              <select
                name="department"
                value={profile.department}
                onChange={handleChange}
                disabled={!isEditable}
                className={`select-field ${isEditable ? "enabled" : "disabled"}`}
              >
                <option value="Management">Management</option>
                <option value="Sales">Sales</option>
                <option value="HR">HR</option>
                <option value="Development">Development</option>
                <option value="Marketing">Marketing</option>
              </select>
              <select
                name="role"
                value={profile.role}
                onChange={handleChange}
                disabled={!isEditable}
                className={`select-field ${isEditable ? "enabled" : "disabled"}`}
              >
                <option value="General Manager">General Manager</option>
                <option value="Manager">Manager</option>
                <option value="Team Lead">Team Lead</option>
                <option value="Developer">Developer</option>
                <option value="Intern">Intern</option>
              </select>
              <div className="form-group2">
                <input
                  type="date"
                  name="dob"
                  value={profile.dob}
                  onChange={handleChange}
                  disabled={!isEditable}
                  className={`input-field ${isEditable ? "enabled" : "disabled"}`}
                />
                <span className="dob">{formatDate(profile.dob)}</span>
              </div>
              <input
                type="text"
                name="email"
                value={profile.email}
                onChange={handleChange}
                disabled={!isEditable}
                className={`select-field ${isEditable ? "enabled" : "disabled"}`}
                placeholder="Email"
              />
              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                disabled={!isEditable}
                className={`select-field ${isEditable ? "enabled" : "disabled"}`}
                placeholder="Phone Number"
              />
              <textarea
                name="note"
                value={profile.note}
                onChange={handleChange}
                disabled={!isEditable}
                className={`textarea-field ${isEditable ? "enabled" : "disabled"}`}
                placeholder="Note"
                rows="3"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
