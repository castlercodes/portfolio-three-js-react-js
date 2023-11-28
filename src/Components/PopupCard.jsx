// PopupCard.jsx

import React from 'react';
import './PopupCard.css';  // Import the CSS file

const PopupCard = ({text}) => {
  return (
    <div className='popupcard'>
      {text == "Contact Me" 
      && 
      <>
      <div>Wanna Know more about me and connect with me?</div>
      <div className='popupcardredirect'>Contact Me</div>
      </>
      } 
      {text == "Projects" 
      && 
      <>
      <div>Explore my Projects and see what i can do</div>
      <div className='popupcardredirect'>Go to Projects</div>
      </>
      } 
      {text == "About Me" 
      && 
      <>
      <div>Know a Little More about me</div>
      <div className='popupcardredirect'>About Me</div>
      </>
      } 
    </div>
  );
}

export default PopupCard;

