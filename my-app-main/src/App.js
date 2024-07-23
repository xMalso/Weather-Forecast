import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importing BrowserRouter, Routes, and Route components from react-router-dom
import Splash from './Splash'; // Importing Splash component
import Planting from './Planting'; // Importing Planting component
import Alerts from './Alerts'; // Importing Alerts component
import WeatherDashboard from "./WeatherDashboard"; // Importing WeatherDashboard component
import Forecast from "./Forecast"; // Importing Forecast component

// App functional component
function App() {
  return (
    // Router component for setting up routing
    <Router>
      {/* Routes component for defining routes */}
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/Planting" element={<Planting />} />
        <Route path="/Alerts" element={<Alerts />} />
        <Route path="/WeatherDashboard" element={<WeatherDashboard />} />
        <Route path="/Forecast" element={<Forecast />} />
      </Routes>
    </Router>
  );
}

export default App;
