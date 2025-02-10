import React from 'react'; 
import { Link } from 'react-router-dom'; 
import './HomePage.css';

function HomePage() {
  return (
    <>
      <div>
        <img src="/logo.png" alt="logo" className='logo' />
      </div>

      <p className="title">Piano di benessere a 360°</p> 
      <p className="subtitle">"Il benessere è un equilibrio tra corpo e mente"</p>

      <Link to="/login">
        <button className="login-button">
          Inizia ora il tuo viaggio!
        </button>
      </Link>
     
      {/* Contenitore con i tre pulsanti allineati orizzontalmente */}
      <div className="button-container">
        <Link to="/chiSiamo">
          <button className="ChiSiamo">Chi Siamo?</button>
        </Link>

        <Link to="/esperti">
          <button className="Esperti">I nostri esperti</button>
        </Link>

        <Link to="/contatti">
          <button className="Contatti">Contatti</button>
        </Link>
      </div>
    </>
  );
}

export default HomePage;
