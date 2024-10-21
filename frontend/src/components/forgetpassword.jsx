import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router
import './css/ForgetPassword.css'; // Import the CSS file
import imgee from "./images/img.png"; // Import the image

const ForgetPassword = () => { // No need to pass onClose prop anymore
  const navigate = useNavigate(); // Initialize useNavigate

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

  // Function to handle the close button click
  const handleClose = () => {
    navigate('/api/login'); // Navigate back to the login page
  };

  return (
    <>
      <div className="mainnn">
        <div className="modal-overlay" onClick={handleClose}></div> {/* Overlay for the background */}
        <div className="modal">
          <button className="close-btn" onClick={handleClose}>&times;</button> {/* Close button */}
          <h2 className='fph2'>STAFF GRID</h2>
          <img src={imgee} alt="Logo" /> {/* Logo image */}
          <input type="email" placeholder="Enter your employee ID to reset password" />
          <button className="submit-btn">Submit</button> {/* Submit button */}
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
