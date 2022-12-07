import React from 'react';
import '../styles.css';

function Navbar() {
  return (
    <nav className="navbar">
      <img src="twitter-logo.png" alt="Twitter logo" className="logo" />
      <img src="youtube-logo.png" alt="YouTube logo" className="logo" />
      <div className="time-counter">
        {/* Time counter goes here */}
      </div>
      <h1>Team Heretics Raffle</h1>
    </nav>
  );
}

export default Navbar;
