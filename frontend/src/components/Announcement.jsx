import React from 'react';
import ViewAnnouncements from './ViewAnnouncement';
import SendAnnouncement from './SendAnnouncement';
import './css/announcement.css';

function Announcement() {
  return (
    <div className="announcement-container">
      <div className="content-grid">
        <div>
          <ViewAnnouncements />
        </div>
        <div>
          <SendAnnouncement />
        </div>
      </div>
    </div>
  );
}

export default Announcement;