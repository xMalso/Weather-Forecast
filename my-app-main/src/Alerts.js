import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './alerts.css';
import logo from "./images/logo.png";
import Navbar from './Navbar';
import CropAlertModal from './CropAlertModal';

function Alerts() {
    // setting initial values for all the variables and their objects to null
    const [selectedCrops, setSelectedCrops] = useState([]);
    const [alertQueue, setAlertQueue] = useState([]);
    const [showAlertModal, setShowAlertModal] = useState(false);
    const [currentAlert, setCurrentAlert] = useState({ crop: "", alertMessage: "" });
    const [noCropSelected, setNoCropSelected] = useState(false);
    const [alertText, setAlertText] = useState(["Safe weather conditions."])
    let alert = JSON.parse(localStorage.getItem('alert'));
    const navigate = useNavigate(); 
    let [alerts, setAlerts] = useState("0 Major alerts.")
    useEffect(() => { // runs the currentAlerts function as soon as the page is loaded
        currentAlerts()
    },[])
    
    const handleCropSelection = (crop) => {
        if (selectedCrops.includes(crop)) {
            setSelectedCrops(selectedCrops.filter(item => item !== crop));
        } else {
            setSelectedCrops([...selectedCrops, crop]);
        }
    };
    const currentAlerts = () => { // checks for major alerts then stores the string to show number of major alerts and the text responsible for each alert
        let numAlerts = "0 Major alerts."
        let counter = 0
        let text = []
        if (alert.temp > 35) {
            counter += 1
            numAlerts = counter+" Major Alert"+(counter===1?"":"s")
            text.push("High Temperatures: Make sure to keep water to stay hydrated and use sunscreen.")
          }

          if (alert.temp < -10) {
            counter += 1
            numAlerts = counter+" Major Alert"+(counter===1?"":"s")
            text.push("Low Temperatures: Dress warmly in layers, and cover exposed skin to prevent frostbite.")
          }
          
          if (alert.clouds > 75) {
            counter += 1
            numAlerts = counter+" Major Alert"+(counter===1?"":"s")
            text.push("Thunderstorm Warning: Seek shelter indoors, avoid open areas and stay away from large bodies of water.")
          }
          
          if (alert.hum > 90) {
            counter += 1
            numAlerts = counter+" Major Alert"+(counter===1?"":"s")
            text.push("Flash Flood Warning: Move to higher ground immediately. Avoid walking or driving through flooded areas.")
          }
          
          if (alert.wind > 29) {
            counter += 1
            numAlerts = counter+" Major Alert"+(counter===1?"":"s")
            if (alert.wind > 74){
                text.push("Violent Tornado Warning: Seek shelter in a sturdy building and stay away from windows and exterior walls.")
            }
            else if (alert.wind > 49.5){
                text.push("Strong Tornado Warning: Seek shelter in a sturdy building and stay away from windows and exterior walls.")
            }
            else{
                text.push("Weak Tornado Warning: Seek shelter in a sturdy building and stay away from windows and exterior walls.")
            }
          }
          if (text.length===0){setAlertText(["Safe weather conditions."])}
          else{setAlertText(text)}
          setAlerts(numAlerts)
          return
    }
    const handleButtonClick = () => {
        if (selectedCrops.length === 0) {
            setNoCropSelected(true);
            return;
        }

        const newAlertQueue = [];
        selectedCrops.forEach(crop => {
            let alertMessage = "";
            switch (crop) {
                case "Wheat":
                    alertMessage = (
                        <>
                            <p>
                                RISK: Wheat crops are susceptible to lodging during thunderstorms, where strong winds can flatten the plants, leading to reduced yields and quality.
                            </p>
                            <p style={{ marginTop: '10px' }}>
                                PREVENTIVE MEASURES: Consider applying growth regulators to strengthen stalks and reduce lodging risk. If a thunderstorm is imminent, consider harvesting wheat if it's close to maturity to minimize damage.
                            </p>
                        </>
                    );
                    break;
                case "Corn":
                    alertMessage = (
                        <>
                            <p>
                                RISK: Cornfields face the risk of wind damage and hail during thunderstorms, which can cause physical injury to plants, reduce yields, and affect grain quality.
                            </p>
                            <p style={{ marginTop: '10px' }}>
                                PREVENTIVE MEASURES: Monitor weather forecasts closely and prepare for potential hail damage by ensuring proper insurance coverage. Consider planting corn varieties with strong stalks and early maturity to minimize the impact of wind damage.
                            </p>
                        </>
                    );
                    break;
                case "Tomato":
                    alertMessage = (
                        <>
                            <p>
                                RISK: Tomato plants are vulnerable to wind and heavy rain during thunderstorms, which can break branches, damage fruits, and increase the risk of diseases like blight.
                            </p>
                            <p style={{ marginTop: '10px' }}>
                                PREVENTIVE MEASURES: Stake or cage tomato plants to provide support against strong winds. Consider covering plants with row covers or protective structures before the storm to minimize physical damage and reduce the risk of disease.
                            </p>
                        </>
                    );
                    break;
                case "Potato":
                    alertMessage = (
                        <>
                            <p>
                                RISK: Potatoes are susceptible to damage from heavy rain during thunderstorms, which can lead to waterlogging, increased disease pressure, and reduced tuber quality.
                            </p>
                            <p style={{ marginTop: '10px' }}>
                                PREVENTIVE MEASURES: Ensure proper drainage in potato fields to prevent waterlogging. Consider hilling up soil around plants to improve drainage. If a thunderstorm is forecasted, monitor fields closely for signs of waterlogging and take corrective actions promptly.
                            </p>
                        </>
                    );
                    break;
                default:
                    break;
            }

            newAlertQueue.push({ crop, alertMessage });
        });
        setAlertQueue(newAlertQueue);
        setCurrentAlert(newAlertQueue[0]);
        setShowAlertModal(true);
        setNoCropSelected(false); // Reset noCropSelected state
    };

    const handleModalClose = () => {
        if (alertQueue.length > 1) {
            setCurrentAlert(alertQueue[1]);
            setAlertQueue(alertQueue.slice(1));
        } else {
            setShowAlertModal(false);
        }
    };

    const handleBackButtonClick = () => {
        navigate(-1);
    };

    return (
        <div>
            <Navbar />
            {/* Back arrow svg */}
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
            <h1 className="title-containerAlerts">
                <span className="titleAlerts">Alerts</span>
                <img src={logo} alt="Logo" style={{ width: '250px', height: 'auto' }} />
            </h1>
            {/* Alerts content */}
            <div className="alerts-container">
                 {/* Displaying alerts */}
                <div className="alerts-content">
                    {/* SVG for alerts */}
                    <div className="alerts-svg">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="100"
                            height="100"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="red"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12" y2="16" />
                        </svg>
                    </div>
                     {/* Alert info */}
                    <div className="alert-info">
                        {/* Displaying number of alerts */}
                        <h2>{alerts}</h2>
                         {/* Displaying alert text */}
                        {alertText.map((text, index) => (
                            <p key={index}>{text}</p>
                        ))}
                    </div>
                </div>
                <div className="crop-selection">
                    {/* Title for crop selection */}
                    <h2>Select Crops:</h2>
                    <div className="crop-checkboxes">
                        {/* Logic for checkboxes */}
                        <label>
                            <input type="checkbox" value="Wheat" onChange={() => handleCropSelection("Wheat")} />
                            Wheat
                        </label>
                        <label>
                            <input type="checkbox" value="Corn" onChange={() => handleCropSelection("Corn")} />
                            Corn
                        </label>
                        <label>
                            <input type="checkbox" value="Tomato" onChange={() => handleCropSelection("Tomato")} />
                            Tomato
                        </label>
                        <label>
                            <input type="checkbox" value="Potato" onChange={() => handleCropSelection("Potato")} />
                            Potato
                        </label>
                    </div>
                     {/* Button to show alert */}
                    <button onClick={handleButtonClick}>Show Alert</button>
                </div>
                {/* Render the "Please select at least one crop" message outside the crop-selection div */}
                {noCropSelected && (
                    <CropAlertModal
                        crop="Error"
                        alertMessage="Please select at least one crop."
                        onClose={() => setNoCropSelected(false)}
                    />
                )}
            </div>
            {/* Render alert modal */}
            {showAlertModal && <CropAlertModal crop={currentAlert.crop} alertMessage={currentAlert.alertMessage} onClose={handleModalClose} />}
        </div>
    );
}

export default Alerts;
