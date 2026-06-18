import React, { useState } from 'react';
import Popup from './Popup'; // Assuming Popup is in the same directory

const PopUpTest = () => {
  const [popups, setPopups] = useState([]);

  const addPopup = (message, type) => {
    // Add a new popup to the state
    setPopups((prevPopups) => [
      ...prevPopups,
      { id: Date.now(), message, type },
    ]);
  };

  const removePopup = (id) => {
    // Remove the popup by its ID
    setPopups((prevPopups) => prevPopups.filter((popup) => popup.id !== id));
  };

  const handleAddPopup = (type) => {
    let message = '';
    switch (type) {
      case 'error':
        message = 'An error occurred!';
        break;
      case 'success':
        message = 'Operation successful!';
        break;
      case 'pending':
        message = 'Pending request...';
        break;
      case 'fetching':
        message = 'Fetching data...';
        break;
      default:
        message = 'Unknown type';
        break;
    }
    addPopup(message, type);
  };

  return (
    <div>
      <button onClick={() => handleAddPopup('error')}>Add Error Popup</button>
      <button onClick={() => handleAddPopup('success')}>Add Success Popup</button>
      <button onClick={() => handleAddPopup('pending')}>Add Pending Popup</button>
      <button onClick={() => handleAddPopup('fetching')}>Add Fetching Popup</button>

      {/* Container to hold popups with horizontal scrolling */}
      <div
        className="fixed top-5 left-1/2 transform -translate-x-1/2 flex flex-col space-x-4 overflow-x-auto z-50 p-4 bg-transparent"
        style={{ maxWidth: '90vw', paddingRight: '20px' }}
      >
        {/* Render the popups */}
        {popups.map((popup) => (
          <Popup
            key={popup.id}
            message={popup.message}
            type={popup.type}
            onClose={() => removePopup(popup.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default PopUpTest;
