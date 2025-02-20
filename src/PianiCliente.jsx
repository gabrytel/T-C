import React from 'react';
import { Link } from 'react-router-dom';
import './PianiCliente.css';
import TastoIndietro from './Componenti/TastoIndietro';

function PianiCliente() {
  return (
    <div>
      <img
        src="/logo.png"
        alt="logo"
        className="logoPianiCliente"
      />

      <div>
        <p className='titolo-pagina'>Seleziona il tuo piano di benessere!</p>
      </div>

      {/* Contenitore dei piani */}
      <div className="piani-cliente-container">
        {/* Piano Fitness */}
        <div className="piano-box">
          <p className="piano-titolo">PIANO FITNESS</p>
          <div className="piano-icona">
            <img src="pianoFitness.png" alt="icona fitness" />
          </div>
          <Link to="/PianoFitness" className="vedi-button">
            VEDI
          </Link>
        </div>

        {/* Piano Nutrizione */}
        <div className="piano-box">
          <p className="piano-titolo">PIANO NUTRIZIONE</p>
          <div className="piano-icona">
            <img src="pianoNutrizione.png" alt="icona nutrizione" />
          </div>
          <Link to="/PianoNutrizione" className="vedi-button">
            VEDI
          </Link>
        </div>

        {/* Piano Benessere della Mente */}
        <div className="piano-box">
          <p className="piano-titolo">PIANO BENESSERE DELLA MENTE</p>
          <div className="piano-icona">
            <img src="pianoPsicologo.png" alt="icona benessere mente" />
          </div>
          <Link to="/PianoMente" className="vedi-button">
            VEDI
          </Link>
        </div>

        {/* Tasto Indietro */}
        <TastoIndietro />
      </div>
    </div>
  );
}

export default PianiCliente;
