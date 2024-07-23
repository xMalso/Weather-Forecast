import React from 'react';

// CropAlertModal functional component
function CropAlertModal({ crop, alertMessage, onClose }) {
    return (
        // Modal overlay
        <div className="modal-overlay">
            {/* Modal */}
            <div className="modal">
                {/* Modal title */}
                <h2>{crop} Alert</h2>
                {/* Modal message */}
                <p>{alertMessage}</p>
                {/* Close button */}
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

// Exporting the CropAlertModal component
export default CropAlertModal;
