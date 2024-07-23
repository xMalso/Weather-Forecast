// version 4
import React, { useState, useEffect } from 'react';
import './dashboard.css';
import logo from "./images/logo.png";
import Navbar from './Navbar';



function WeatherDashboard() {
  // setting initial values for all the variables and their objects to null
  let [weatherData, setWeatherData] = useState({ temp: null, hum: null, wind: null, rain: null, cloud: null, min: null, max: null });
  let [forecastData, setForecastData] = useState([{ day: null, temp: null, rain: null, hum: null, wind: null }, { day: null, temp: null, rain: null, hum: null, wind: null }, { day: null, temp: null, rain: null, hum: null, wind: null }, { day: null, temp: null, rain: null, hum: null, wind: null }]);
  let [search, setSearch] = useState(null);
  let [name, setName] = useState(null);
  let [plantingData, setPlantingData] = useState({ hum: null, avgHum: null, rain: null, avgRain: null, windS: null, windD: null, windG: null })
  let [forecastToday, setForecastToday] = useState([{ time: null, min: null, max: null, rain: null, rainmm: null, hum: null }, { time: null, min: null, max: null, rain: null, rainmm: null, hum: null }, { time: null, min: null, max: null, rain: null, rainmm: null, hum: null }, { time: null, min: null, max: null, rain: null, rainmm: null, hum: null }, { time: null, min: null, max: null, rain: null, rainmm: null, hum: null }, { time: null, min: null, max: null, rain: null, rainmm: null, hum: null }, { time: null, min: null, max: null, rain: null, rainmm: null, hum: null }, { time: null, min: null, max: null, rain: null, rainmm: null, hum: null }])
  let [alertData, setAlertData] = useState({ temp: null, wind: null, hum: null, clouds: null })
  useEffect(() => { // stores the data from the api and the location name everytime they are changed
    localStorage.setItem('forecastToday', JSON.stringify(forecastToday));
    localStorage.setItem('location', name);
    localStorage.setItem('planting', JSON.stringify(plantingData))
    localStorage.setItem('alert', JSON.stringify(alertData))
  }, [plantingData, forecastToday, name, alertData]);
  useEffect(() => { // gets the current location and stores the api data needed when the website starts
    const getLocation = () => {
      let opts = {
        enableHighAccuracy: true,
        timeout: 1000 * 10,
        maximumAge: 1000 * 60 * 5,
      };
      navigator.geolocation.getCurrentPosition(
        (position) => {
          let lat = position.coords.latitude.toFixed(2);
          let long = position.coords.longitude.toFixed(2);
          fetchWeatherData(lat, long, null, false);
        },
        (err) => {
          console.error(err);
        },
        opts
      );
    };
    getLocation();
  }, []);
  const current = { // gets the users current latitude and longitude
    init: () => {
      document.getElementById('btnCurrent').addEventListener('click', current.getLocation);
    },
    getLocation: () => {
      let opts = {
        enableHighAccuracy: true,
        timeout: 1000 * 10,
        maximumAge: 1000 * 60 * 5,
      };
      navigator.geolocation.getCurrentPosition(current.ftw, current.wtf, opts);
    },
    wtf: (err) => {
      console.error(err)
    },
    ftw: (position) => {
      let lat = position.coords.latitude.toFixed(2);
      let long = position.coords.longitude.toFixed(2);
      fetchWeatherData(lat, long, null, false);
    }
  }
  const searchCity = (name) => { // stores the api data using the name of the city
    fetchWeatherData(null, null, name, true)
  }
  

  const day = (dt) => { // gets day of the week using dt variable from the api data
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let date = new Date(dt * 1000).getDay()
    return daysOfWeek[date]
  }
  const getTimeOfDay = (dt, nextDay) => { // gets time of the day using dt variable from the api data
    const date = new Date(dt * 1000);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    if (nextDay) { return `Tomorrow ${hours}:${minutes}` }
    else { return `Today ${hours}:${minutes}` }
  };
  const average1dp = (array, size, Class) => { // gets the average of all the object 'Class' in an array to 1 dp and returns it
    if (array.length === 0) { return 0 }
    let sum = 0
    if (size < array.length) { size = array.length }
    for (let i = 0; i < size; i++) {
      sum += array[i]?.[Class] || 0
    }
    return Math.trunc(sum / array.length * 10) / 10
  }
  const getWindAngle = (degrees) => { // gets the wind angle using the degrees from the api data
    let directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
    return directions[Math.trunc(degrees / 45)]
  }
  const fillAPIArrays = async (apiW, apiF, forecastToday, forecastData, name) => { // takes the api links and arrays that need to be filled and name of city and calls the apis and stores the information into the arrays given
    let responseF = await fetch(apiF);
    let nextDay = false
    if (responseF.ok) {
      let dataF = await responseF.json();
      for (let i = 1; i < 5; i++) {
        forecastData.push({
          day: day(dataF.list[8 * i].dt),
          temp: Math.trunc(dataF.list[8 * i].main.temp * 10) / 10,
          hum: dataF.list[8 * i].main.humidity,
          wind: dataF.list[8 * i].wind.speed,
          rain: Math.trunc(dataF.list[8 * i].pop * 100)
        })
      }
      setName(name)
      setForecastData(forecastData)
      for (let i = 0; i < 8; i++) {
        forecastToday.push({
          time: getTimeOfDay(dataF.list[i].dt, nextDay),
          min: Math.trunc(dataF.list[i].main.temp_min * 10) / 10,
          max: Math.trunc(dataF.list[i].main.temp_max * 10) / 10,
          rain: Math.trunc(dataF.list[i].pop * 100),
          rainmm: dataF.list[i].rain,
          hum: dataF.list[i].humidity
        })
        setForecastToday(forecastToday)
        if (forecastToday[i].time === `Today 00:00`) {
          nextDay = true
          forecastToday[i].time = `Tomorrow 00:00`
        }
      }
      let responseW = await fetch(apiW);
      if (responseW.ok) {
        let dataW = await responseW.json();
        setWeatherData({
          temp: Math.trunc(dataW.main.temp * 10) / 10,
          hum: dataW.main.humidity,
          wind: dataW.wind.speed,
          rain: Math.trunc(dataF.list[0].pop * 100),
          cloud: dataW.clouds.all,
          min: Math.trunc(dataW.main.temp_min * 10) / 10,
          max: Math.trunc(dataW.main.temp_max * 10) / 10
        });
        setPlantingData({
          temp: Math.trunc(dataW.main.temp * 10) / 10,
          hum: dataW.main.humidity,
          avgHum: average1dp(dataF.list, 8, "humidity"),
          rain: dataF.list[0].rain?.["3h"] || 0,
          avgRain: average1dp(dataF.list, 8, "rain[\"3h\"]"),
          windS: dataW.wind.speed,
          windD: getWindAngle(dataW.wind.deg) || "N/A",
          windG: dataW.wind?.gust || 0
        });
        setAlertData({
          temp: Math.trunc(dataW.main.temp * 10) / 10,
          wind: dataW.wind.speed,
          hum: dataW.main.humidity,
          clouds: dataW.clouds.all
        })
      }
    }
  }
  const fetchWeatherData = async (lat, lon, name, namegiven) => { // passes the api links with the filled in apikey and name/longitude and latitude to the fillAPIArrays function
    const apiKey = "1b5cc16d2ec213b2217bc08f09937bc7"
    let weatherAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    let forecastAPI = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    let nameWeatherAPI = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${apiKey}&units=metric`;
    let nameForecastAPI = `https://api.openweathermap.org/data/2.5/forecast?q=${name}&appid=${apiKey}&units=metric`;
    try {
      if (namegiven) {
        fillAPIArrays(nameWeatherAPI, nameForecastAPI, [], [], name)
      }
      else if (!namegiven) {
        fillAPIArrays(weatherAPI, forecastAPI, [], [], "Current Location")
      }
      else {
        console.error('Failed to fetch weather/forecast data');
      }
    } catch (error) {
      console.error('Error fetching weather/forecast data:', error);
    }
  };

  return (
    <div className="weather-dashboard">
      {/* Navbar component */}
      <Navbar />
      {/* Logo */}
      <h1><img src={logo} alt="Logo" style={{ width: '250px', height: 'auto' }} /></h1>
      {/* Main container */}
      <div className="container">
        <div className="flex-container">
          {/* Weather input */}
          <div className="weather-input" style={{ width: '600%', marginLeft: 80 }}>
            <h3>“It feels good at the end of the day to know you made a product that other people are going to enjoy.”- Jericho Sanchez. 24</h3>
            <br></br>
            {/* Input field */}
            <h3>Enter a City Name</h3>
            <input className="city-input" type="text" placeholder="E.g. Sanaa, Dhaka, London" onChange={(event) => setSearch(event.target.value)} />
            {/* Search button */}
            <button className="search-btn" onClick={() => (searchCity(search))}>Search</button>
            {/* Separator */}
            <div className="separator"></div>
            {/* Button to use current location */}
            <button className="location-btn" onClick={current.getLocation}>Use Current Location</button>
          </div>
          {/* Display weather data if available */}
          {weatherData && (
            <div className="weather-data" style={{ marginTop: '8%' }}>
              <h2>{name}:</h2>

              <h6>Temperature: {weatherData.temp}°C</h6>
              <h6>Wind: {weatherData.wind}M/S</h6>
              <h6>Humidity: {weatherData.hum}%</h6>
              <h6>Clouds: {weatherData.cloud}%</h6>
              <h6>Minimum Temperature: {weatherData.min}°C</h6>
              <h6>Maximum Temperature: {weatherData.max}°C</h6>
              <h6>Rain: {weatherData.rain}%</h6>
            </div>
          )}
        </div>

        {/* Forecast for next 4 days */}
        <div className="days-forecast">
          <h2>4-Day Forecast for {name}</h2>
          <ul className="weather-cards">
            {/* Map through forecast data to display each day's forecast */}
            {forecastData.map((dayForecast, i) => (
              <li className="card">
                <h3>{forecastData[i].day}</h3>
                <h6>Temperature: {forecastData[i].temp}°C</h6>
                <h6>Rain: {forecastData[i].rain}%</h6>
                <h6>Wind Speed: {forecastData[i].wind} M/S</h6>
                <h6>Humidity: {forecastData[i].hum}%</h6>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default WeatherDashboard