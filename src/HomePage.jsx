import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  
  return (
    <>
    <div>
      <img src= "/logo.png" alt="logo" />
    </div>
     <h1>Piano di benessere a 360°</h1> 
      <h2>Il benessere è un equilibrio tra corpo e mente</h2>
      <Link to="/login">
        <button className="login-button">
          Inizia ora il tuo viaggio!
        </button>
      </Link>
    </>
    );
}

export default HomePage;
