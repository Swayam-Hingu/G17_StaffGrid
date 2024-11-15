import React, { useState } from 'react';
import {
  Home,
  LayoutDashboard,
  Calendar,
  FolderKanban,
  Users,
  Settings,
  HelpCircle,
  Menu,
  X,
} from 'lucide-react';
import '../components/css/home.css'; // Importing CSS
import Image1 from '../components/images/img.png';
import Image2 from '../components/images/staffgrid.jpg';
import Image3 from '../components/images/virat.jpeg';

const HomePage = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [employee, setEmployee] = useState({
    name: 'Employee',
    photoUrl: '/api/placeholder/150/150',
  });

  return (
    <div className="homepage-container">
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        {/* Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className="sidebar-toggle"
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Logo Section */}
        <div className="logo-section">
          <div className="logo-circle">
            <img src={Image1} alt="Logo" />
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="nav-menu">
          <NavItem icon={<Home size={20} />} text="Home" isOpen={isSidebarOpen} active />
          <NavItem icon={<LayoutDashboard size={20} />} text="Dashboard" isOpen={isSidebarOpen} />
          <NavItem icon={<FolderKanban size={20} />} text="Projects" isOpen={isSidebarOpen} />
          <NavItem icon={<Calendar size={20} />} text="Calendar" isOpen={isSidebarOpen} />
          <NavItem icon={<Users size={20} />} text="Team" isOpen={isSidebarOpen} />

          <div className="nav-divider"></div>

          <NavItem icon={<Settings size={20} />} text="Settings" isOpen={isSidebarOpen} />
          <NavItem icon={<HelpCircle size={20} />} text="Help" isOpen={isSidebarOpen} />
        </nav>
      </div>

      {/* Main Content */}
      <div className={`main-content ${isSidebarOpen ? 'shifted' : ''}`}>
        {/* Top Bar */}
        <div className="top-bar">
          <div className="profile-section">
            <h1>STAFFGRID</h1>
            <div className="inbox">
              <a href="#" className="notification">
                <span>Inbox</span>
                <span className="badge">3</span>
              </a>
              <div className="profile-photo-container">
                <img src={Image3} alt="Employee" className="profile-photo" />
              </div>
              <div className="online-status"></div>
            </div>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="welcome-container">
          <div className="welcome-content">
            <h1 className="welcome-text">WELCOME</h1>
            <div className="employee-welcome">
              <p className="employee-name-large">{employee.name}</p>
              <p className="welcome-subtitle">We're glad to have you here</p>
              <button>Start</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const NavItem = ({ icon, text, isOpen, active }) => (
  <button className={`nav-item ${active ? 'active' : ''}`}>
    <span className="nav-icon">{icon}</span>
    <span className={`nav-text ${isOpen ? 'visible' : 'hidden'}`}>{text}</span>
  </button>
);

export default HomePage;
