import React from 'react';
import ViewAnnouncements from './ViewAnnouncement';
import SendAnnouncement from './SendAnnouncement';
import './css/announcement.css';
import Cookies from 'js-cookie';


function Announcement() {
  const role = Cookies.get('employeeRole');
  return (
    <div className="announcement-container">
      <div className={(role=='manager' || role== 'hr' || role=='admin') ? "content-grid" : "role-grid"}>
        <div>

        </div>
        <div>
          <ViewAnnouncements />
        </div>
        <div>
          {(role=='manager' || role== 'hr' || role=='admin')? <SendAnnouncement /> : null}
           {/* <SendAnnouncement />  */}
        </div>
      </div>
    </div>
  );
}

export default Announcement;