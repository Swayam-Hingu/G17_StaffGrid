import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import './css/viewannouncement.css';

function ViewAnnouncement() {
  const [announcements, setAnnouncements] = useState([
    {
      message: "Hello",
      senderRole: "Manager",
      senderID: "3001",
      createdAt: "2022-01-01T00:00:00.000Z"
    },
    {
      message: "Hello",
      senderRole: "Manager",
      senderID: "3001",
      createdAt: "2022-01-01T00:00:00.000Z"
    },
    {
      message: "Hello",
      senderRole: "Manager",
      senderID: "3001",
      createdAt: "2022-01-01T00:00:00.000Z"
    },

  ]);
  const [announcementByMe, setAnnouncementByMe] = useState([
    {
      message: "Hello",
      senderRole: "Manager",
      senderID: "3001",
      createdAt: "2022-01-01T00:00:00.000Z"
    },
    {
      message: "Hello",
      senderRole: "Manager",
      senderID: "3001",
      createdAt: "2022-01-01T00:00:00.000Z"
    },

  ]);
  const [activeTab, setActiveTab] = useState("All");
  const token = Cookies.get('token');
  const empid = Cookies.get('employeeID');

  const getAllMessages = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/login/viewannouncement', {
        withCredentials: true,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setAnnouncements(response.data.announcements);
    } catch (error) {
      console.log(error);
    }
  };

  const getMessagesSentByMe = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/login/viewannouncementsendbyme', {
        withCredentials: true,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setAnnouncementByMe(response.data.announcements);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllMessages();
    getMessagesSentByMe();
  }, []);

  const renderAnnouncements = (announcementsList) => {
    return announcementsList.length > 0 ? (
      announcementsList.map((announcement) => (
        <div key={announcement._id} className="announcement-card">
          <p className="announcement-text"><strong>Message:</strong> {announcement.message}</p>
          <p className="announcement-text"><strong>Role:</strong> {announcement.senderRole}</p>
          <p className="announcement-text"><strong>Sender ID:</strong> {announcement.senderID}</p>
          <p className="announcement-text"><strong>Created At:</strong> {new Date(announcement.createdAt).toLocaleString()}</p>
        </div>
      ))
    ) : (
      <p className="no-announcements">No announcements found.</p>
    );
  };

  return (
    <div className="view-announcement-container">
      <h2 className="header">Announcements  {empid}</h2>
      <div className="tab-container">
        <div
          className={`tab ${activeTab === "All" ? "active" : ""}`}
          onClick={() => setActiveTab("All")}
        >
          All
        </div>
        <div
          className={`tab ${activeTab === "Sent by Me" ? "active" : ""}`}
          onClick={() => setActiveTab("Sent by Me")}
        >
          Sent by Me
        </div>
      </div>
      <div className="announcements-list">
        {activeTab === "All" ? renderAnnouncements(announcements) : renderAnnouncements(announcementByMe)}
      </div>
    </div>
  );
}

export default ViewAnnouncement;