import React, { useState } from 'react'; // Ensure this is the only import for React
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="header">
      <div className="logo">
        <h1>Health</h1>
      </div>
      <nav className={`links ${isMobileMenuOpen ? 'open' : ''}`}>
        <Link to="/" className="link">Home</Link>
        <Link to="/about" className="link">About Us</Link>
        <Link to="/mapview" className="link">Maps</Link>
        <Link to="/sign" className="link">Sign Up</Link>
        <Link to="/report" className="link">Scan</Link>
        <Link to="/chatbot" className="link">Chat</Link>
      </nav>
      <div className="hamburger" onClick={toggleMobileMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </header>
  );
};

export default Header;