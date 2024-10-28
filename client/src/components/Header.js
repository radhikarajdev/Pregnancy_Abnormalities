import React from 'react';
import {Link} from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header>
      <div className="logo">
        <h1>Health</h1>
      </div>
      <nav className='links'>
        <Link to="/" className="link">Home</Link>
        <Link to="/about" className="link">About Us</Link>
        <Link to="/mapview" className="link">Maps</Link>
        <Link to="/sign" className="link">Sign Up</Link>
      </nav>
    </header>
  );
};

export default Header;
