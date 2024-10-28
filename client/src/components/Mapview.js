import React from 'react';
import Map from './Map';
import './Mapview.css';

const Mapview = () => {
  return (
    <div className='map-page'>
        <h1>Hospitals Near Me</h1>
        <div className='map-container'>
          <Map />
        </div>
    </div>
  );
};

export default Mapview;