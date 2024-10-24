import React, { useEffect } from 'react';
import './css/ForgetPassword.css'; // Import the CSS file
import emslogo from './css/ForgetPassword.css'; // Import the image

const ForgetPassword = ({ onClose }) => {
  useEffect(() => {
    const mainContent = document.querySelector('.main-content'); // Selecting main content to blur
    if (mainContent) {
      mainContent.classList.add('blur-background'); // Apply blur effect
    }

    return () => {
      if (mainContent) {
        mainContent.classList.remove('blur-background'); // Remove blur effect on cleanup
      }
    };
  }, []);

  return (
    <>
    <div className="mainnn">
      <div className="modal-overlay" onClick={onClose}></div> {/* Overlay for the background */}
      <div className="modal">
        <button className="close-btn" onClick={onClose}>&times;</button> {/* Close button */}
        <h2 className='fph2'>STAFF GRID</h2>
        <img src={emslogo} alt="Logo" /> {/* Logo image */}
        <input type="email" placeholder="Enter your email to reset password" />
        <button className="submit-btn">Submit</button> {/* Submit button */}
      </div>
      </div>
    </>
  );
};

export default ForgetPassword;
