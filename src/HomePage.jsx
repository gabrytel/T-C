import React from 'react';
import { Link } from 'react-router-dom'; 
import './HomePage.css';

function HomePage() {
  
  return (
    <>
    <div>
      <img src= "/logo.png" alt="logo" 
      className='logo'
      />
    </div>
     <h1>Piano di benessere a 360°</h1> 
      <h2>"Il benessere è un equilibrio tra corpo e mente"</h2>
      <Link to="/login">
        <button className="login-button">
          Inizia ora il tuo viaggio!
        </button>
      </Link>
     
      <div className="container">
        <div> 
          <Link to ="/chiSiamo">
          <button className="ChiSiamo"> 
            Chi Siamo?
          </button>
          </Link>
        </div>

         <div> 
          <Link to ="/esperti">
          <button className="Esperti"> 
            I nostri esperti
          </button>
          </Link>
        </div> 

        <div> 
          <Link to ="/contatti">
          <button className="Contatti"> 
            Contatti
          </button>
          </Link>
        </div>

    </div>

    </>
    );
}

export default HomePage;
