import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PlantingModal from './PlantingModal'; // Importing the PlantingModal component
import './planting.css'; // Importing CSS file
import logo from "./images/logo.png"; // Importing logo image
import Navbar from './Navbar'; // Importing Navbar component

function Planting() {
    const descriptions = {
        "UV": "The UV index measures the intensity of ultraviolet (UV) radiation from the sun.",
        "Wind": "Wind speed and direction indicate the movement of air molecules in the atmosphere.",
        "Rainfall": "Rainfall measures the amount of precipitation in the form of rain, influencing soil moisture and plant growth.",
        "Humidity": "Humidity is the moisture content in the air, while the dew point indicates the temperature at which the air reaches saturation, causing condensation and possibly fog or dew."
    };


    let location = localStorage.getItem('location');
    let plantingData = JSON.parse(localStorage.getItem('planting'));



    const navigate = useNavigate();
    const [modalTitle, setModalTitle] = useState(""); // State to manage modal title
    const [modalContent, setModalContent] = useState(null); // State to manage modal content
    const [showModal, setShowModal] = useState(false); // State to manage modal visibility

    const handleTextboxClick = (type, title) => {
        const description = descriptions[type];
        setModalTitle(title); // Set modal title
        setModalContent(description); // Set modal content
        setShowModal(true); // Show modal
    };

    const handleButtonClick = () => {
        const message = "Use frost blankets or row covers to protect grapevines from direct exposure to frost.";
        setModalTitle("Crop Recommendations"); // Set modal title
        setModalContent(message); // Set modal content
        setShowModal(true); // Show modal
    };

    const handleBackButtonClick = () => {
        navigate(-1);
    };

    const closeModal = () => {
        setShowModal(false); // Hide modal
    };

    const plantRecommendation = () => {

        let recommendPlants = ''
        //Conditions for which crops to plant
        if (plantingData.rain <= 2 && plantingData.temp <= 15) {
            recommendPlants = "Lavender, Tomatoes, Basil, Mint";
        } else if (plantingData.rain < 2 && plantingData.hum <= 60) {
            recommendPlants = "Rice, Rubber, Pineapple, Tapioca";
        } else if (plantingData.windS > 7) {
            recommendPlants = "Peppers, Cucumbers, Squash, Beans";
        } else if (plantingData.temp < 10) {
            recommendPlants = "Carrots, Potatoes, Turnips, Radishes";
        } else if (plantingData.temp > 15) {
            recommendPlants = "Watermelon, Cantaloupe, Pumpkins, Corn";
        } else {
            recommendPlants = "Succulents, Marigolds, Rosemary, Zinnias";
        }
        return recommendPlants;
    }

    const recommendedPlants = plantRecommendation();



    return (
        <div>
            {/* Navbar */}
            <Navbar />

            {/* Back button */}
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

           {/* Title and logo */}
           <h1 className="title-containerPlant">
                <span className="titlePlant" >Planting</span>
                <img src={logo} alt="Logo" style={{ width: '250px', height: 'auto' }} />
            </h1>

            {/* Location */}
            <div className="location-infoPlant">
                <h2 className="location">{location}</h2>
            </div>

            {/* Weather parameter textboxes */}
            <div className="textbox-containerPlant" style={{ width: '98%', marginLeft: '1%' }}>
                {/* UV Index */}
                <div className="textboxPlant" id="hover" onClick={() => handleTextboxClick("UV", "UV INDEX")}>
                    <div className="textbox-content">
                        <div className="textbox-title">UV INDEX</div>
                        <div className="textbox-textPlant">0</div>
                        <div className="textbox-textPlant">Low</div>
                        <div className="textbox-textPlant">Low for the rest of the day</div>
                    </div>
                </div>

                {/* Wind */}
                <div className="textboxPlant" id="hover" onClick={() => handleTextboxClick("Wind", "Wind")}>
                    <div className="textbox-content">
                        <div className="textbox-title">Wind</div>
                        <div className="textbox-textPlant">Wind Speed: {plantingData.windS}M/S</div>
                        <div className="textbox-textPlant">Wind Gust: {plantingData.windG}MPH</div>
                        <div className="textbox-textPlant">Wind Direction: {plantingData.windD}</div>
                    </div>
                </div>

                {/* Rainfall */}
                <div className="textboxPlant" id="hover" onClick={() => handleTextboxClick("Rainfall", "RAINFALL")}>
                    <div className="textbox-content">
                        <div className="textbox-title">RAINFALL</div>
                        <div className="textbox-textPlant"> {plantingData.rain}mm expected in the next 3h</div>
                        <div className="textbox-textPlant">{plantingData.avgRain}mm expected in the next 24h</div>
                    </div>
                </div>

                 {/* Humidity */}
                <div className="textboxPlant" id="hover" onClick={() => handleTextboxClick("Humidity", "HUMIDITY")}>
                    <div className="textbox-content">
                        <div className="textbox-title">HUMIDITY</div>
                        <div className="textbox-textPlant">Current Humidity {plantingData.hum}%</div>
                        <div className="textbox-textPlant">Average Humidity {plantingData.avgHum}%</div>
                        <div className="textbox-textPlant">The dew point is 16°C</div>
                    </div>
                </div>
            </div>

            {/* Crop recommendations */}
            <div className="textbox-containerPlant">
                <div className="cropRec">
                    <div className="textbox-content" style={{ textAlign: 'center' }}>
                        <div className="textbox-titleBig">CROP RECOMMENDATIONS</div>
                        <div className="textbox-titleMed"> {recommendedPlants}</div>
                        <br></br>
                        <div className="textbox-textPlant">Frost Advisory: Protect delicate crops like grapes from freezing temperatures.</div>
                        <div className="textbox-textPlant">Monitor for pests and adjust irrigation to prevent frost damage.</div>
                        <div className="button-container">
                             {/* More Info button */}
                            <button className="info-button" onClick={handleButtonClick}>More Info</button>
                        </div>
                    </div>
                </div>
            </div>
             {/* Render modal if showModal is true */}
            {showModal && <PlantingModal title={modalTitle} content={modalContent} onClose={closeModal} />} {/* Render modal if showModal is true */}
        </div>
    );
}

export default Planting;