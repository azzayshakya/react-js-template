// PopupManager.jsx
import React, { useState } from 'react';
import Popup from './Popup';

const PopupManager = () => {
  const [popups, setPopups] = useState([]);

  const addPopup = (message, type) => {
    const id = new Date().getTime(); // Generate a unique id for each popup
    setPopups((prev) => [...prev, { id, message, type }]);

    // Automatically remove the popup after 5 seconds
    setTimeout(() => {
      removePopup(id);
    }, 5000);
  };

  const removePopup = (id) => {
    setPopups((prev) => prev.filter((popup) => popup.id !== id));
  };

  return (
    <div>
      <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 space-y-3 z-50">
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

export default PopupManager;
