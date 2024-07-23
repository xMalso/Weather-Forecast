
// Splash.js
import React from 'react';
import './splash.css'; //import splash css file
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import logo from './images/logo.png'; // Import farmcast logo

const Splash = () => {
  const navigate = useNavigate(); // Get navigate function using useNavigate hook

  // Function to redirect to the weather dashboard page
  const redirectToFirstPage = () => {
    navigate('/WeatherDashboard'); // send to weatherdashboard
  };

  return (
    <div className="splash-container">
      <img src={logo} alt="Logo" className="logo" />
      <button className="go-button" onClick={redirectToFirstPage}>Go</button>
    </div>
  );
};

export default Splash;

