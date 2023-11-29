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
      <>
      <Spinner animation="border" size="sm" />
      <Spinner animation="border" />
      <Spinner animation="grow" size="sm" />
      <Spinner animation="grow" />
    </>
      
    </div>
  );
};

export default LoadingModal;
