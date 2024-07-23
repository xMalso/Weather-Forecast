// PlantingModal.js
// Js code for the module pup up used on the planting page
import React from 'react';


// Define a function named PlantingModal
function PlantingModal({ title, content, onClose }) {
    // The component returns JSX that represents a modal dialog box
    return (
        <div className="modal-overlay"> 
            <div className="modal">
                <h2>{title}</h2> {/* Display the title of the modal */}
                <p>{content}</p> {/* Display the content of the modal */}
                <button onClick={onClose}>Close</button> {/* Button to close the modal, onClick event triggers the onClose function */}
            </div>
        </div>
    );
}

export default PlantingModal;
