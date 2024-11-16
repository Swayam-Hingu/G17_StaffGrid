import React from 'react';
import ViewAnnouncements from './ViewAnnouncement';
import SendAnnouncement from './SendAnnouncement';
import './css/announcement.css';
import Cookies from 'js-cookie';


function Announcement() {
  const role = Cookies.get('employeeRole');
  return (
    <div className="announcement-container">
      <div className="content-grid">
        <div>
          <ViewAnnouncements />
        </div>
        <div>
          {(role=='manager' || role== 'hr' || role=='admin')? <SendAnnouncement /> : null}
        </div>
      </div>
    </div>
  );
}

export default Announcement;