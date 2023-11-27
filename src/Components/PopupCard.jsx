// PopupCard.jsx

import React from 'react';
import './PopupCard.css';  // Import the CSS file

const PopupCard = ({text}) => {
  return (
    <div className='popupcard'>
      <h2>{text}</h2>
      <p>Some information about the planet...</p>
    </div>
  );
}

export default PopupCard;

