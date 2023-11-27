import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket } from '@fortawesome/free-solid-svg-icons';
import './Loader.css';
import { Html } from "@react-three/drei";

const Loader = () => {
  return (
    <Html>
        <div className="loader-container">
        <div className="loader">
            <FontAwesomeIcon icon={faRocket} className="rocket-icon" />
            <div className="orbit" />
        </div>
        </div>
    </Html>
  );
};

export default Loader;
