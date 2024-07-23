// Importing CSS file and React
import './navbar.css';
import React from 'react';

// Navbar functional component
function Navbar() {
  return (
    // Navbar HTML structure
    <nav className="navbar">
      <ul>
        {/* Home link */}
        <li>
          <a href="/WeatherDashboard">
            {/* Home icon */}
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
              className="feather feather-home"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            Home
          </a>
        </li>
        {/* Forecast link */}
        <li>
          <a href="/Forecast">
            {/* Forecast icon */}
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
              className="feather feather-extendedforecast"
            >
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
            Forecast
          </a>
        </li>
        {/* Planting link */}
        <li>
          <a href="/Planting">
            {/* Planting icon */}
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
              className="feather feather-plantingguide"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="1" x2="12" y2="23"></line>
              <line x1="1" y1="12" x2="23" y2="12"></line>
            </svg>
            Planting
          </a>
        </li>
        {/* Alerts link */}
        <li>
          <a href="/Alerts">
            {/* Alerts icon */}
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
              className="feather feather-alerts"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12" y2="16"></line>
            </svg>
            Alerts
          </a>
        </li>
        {/* Farm News link */}
        <li>
          <a href="https://www.fwi.co.uk" target="_blank" rel="noopener noreferrer">
            {/* Farm News icon */}
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
              className="feather feather-farmersnews"
            >
              <path d="M21 5v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5"></path>
              <polyline points="17 7 12 12 7 7"></polyline>
            </svg>
            Farm News
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
