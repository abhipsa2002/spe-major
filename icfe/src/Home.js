import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './images/iiitb_logo.jpg';
import './home.css';
import { useEmail } from './Context/EmailContext';

const HomePage = (props) => {
  const navigate = useNavigate();
  const { logout,email } = useEmail(); 

  useEffect(() => {
    if (email === null) {
      navigate('/login');
    }
  }, [email, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
    console.log('Logged out');
    console.log(email);
  };

  const navigateToGenerateCaption = () => {
    navigate('/generate');
  };

  const navigateToCourseDetails = () => {
    navigate('/pastCaptions');
  };

  return (
    <div className="home-container">
      <div className="header">
        <img src={logo} alt="Logo" className="logo" />
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
      <div className="employee-course-container">
        <div className="employee-section">
          <h1>Generate Captions Section</h1>
          <p>Click here to generate captions for new images..</p>
          <button className="logout-btn" onClick={navigateToGenerateCaption}>Generate Captions</button>
        </div>
        <div className="course-section">
          <h1>Past Captions Section</h1>
          <p>Click here to view past images and captions..</p>
          <button onClick={navigateToCourseDetails}>Past Captions</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

