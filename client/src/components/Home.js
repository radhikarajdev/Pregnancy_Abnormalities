import React from 'react';
import './Home.css';
import image from '/Users/radhikarajdev/vscode/se/client/src/components/pregnant.jpg';

const Home = () => {
  return (
    <div className="main-content">
      <div className='before'>
        <div className='text-content'>
          <h1>Do you know ?</h1>
          <p>The second trimester of pregnancy, often referred to as the "golden period," typically spans from weeks 13 to 26 weeks; it  remains an important screening  tool for detecting foetal abnormalities . Although the second trimester is often more comfortable than the first, it is still crucial to monitor for potential complications such as preeclampsia, gestational diabetes, or issues with the placenta.</p>
        </div>
        <div className="image-container">
          <img src={image} alt="Your description" className="circular-image" />
        </div>
      </div>
      <div className='after'>
        {/* <div className='Log-in'></div> */}
        <div className='disclaimer'>
          <h1>Medical Disclaimer !!</h1>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo possimus labore tempora similique quaerat consectetur corporis voluptatum omnis pariatur? Minus enim alias eaque corrupti aliquid fugit earum velit labore cupiditate.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
