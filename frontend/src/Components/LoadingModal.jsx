import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import logofondo from "../img/logofondo.png";

const LoadingModal = () => {
  return (
    <div className="loading-container">
      <div className="background-gradient" />
      <div className="image-container">
        <img src={logofondo} alt="Loading" className="loading-image" />
      </div>
      <div className="loading-text">
        <h1>Empleos Chavez Pamba</h1>
      </div>
      <div className="spinner-container">
        <Spinner animation="grow" className="spinner" />
      </div>
    </div>
  );
};

export default LoadingModal;
