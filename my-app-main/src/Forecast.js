import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Forecast.css'; // Importing CSS file for styling
import logo from "./images/logo.png"; // Importing logo image
import Navbar from './Navbar'; // Importing Navbar component

// Forecast functional component
function Forecast() {
    const navigate = useNavigate(); // Hook for programmatic navigation

    // Function to handle back button click
    const handleBackButtonClick = () => {
        navigate(-1); // Navigating back
    };

    // retrieving location and forecast data from localStorage
    let location = localStorage.getItem('location');
    let forecast = JSON.parse(localStorage.getItem('forecastToday'));

    return (
        // Forecast HTML structure
        <>
            {/* Navbar component */}
            <Navbar />
            {/* Back arrow button */}
            <div className="back-arrow" onClick={handleBackButtonClick}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
            </div>
            {/* Forecast title and logo */}
            <h1 className="title-containerForecast">
                <span className="titleForecast">Extended Forecast</span>
                <img src={logo} alt="Logo" style={{ width: '250px', height: 'auto' }} />
            </h1>
            {/* Location information */}
            <div className="location-infoForecast">
                <h2 className="location">{location}</h2>
            </div>
            {/* Forecast data */}
            <div className="forecast-container">
                <div className="forecast-section">
                    <div className="forecast-carousel">
                        {/* Mapping through forecast data to display hourly forecast */}
                        {forecast.map((hourForecast, i) => (
                            <div key={i} className="forecast-day">
                                <div className="textboxForecast">
                                    <div className="textbox-content">
                                        {/* Hourly forecast information */}
                                        <div className="textbox-title">{hourForecast.time}</div>
                                        <div className="textbox-text">Rain: {hourForecast.rain}%</div>
                                        <div className="textbox-text">Min Temp: {hourForecast.min}°C</div>
                                        <div className="textbox-text">Max Temp: {hourForecast.max}°C</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

// Exporting the Forecast component
export default Forecast;
