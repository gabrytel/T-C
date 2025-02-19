import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Profilo.css';
import TastoIndietro from './Componenti/TastoIndietro';

function Profilo() {
  const [utente, setUtente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    fetch(`http://localhost:5000/api/profilo?email=${userEmail}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore nel recupero del profilo utente");
        }
        return response.json();
      })
      .then((data) => {
        setUtente(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Caricamento...</p>;
  }

  if (error) {
    return <p>Errore: {error}</p>;
  }

  return (
    <div className="profilo-utente-container">
      <img
        src="/logo.png"
        alt="logo"
        className="logoProfilo" 
      />
      <p className="profilo-title">PROFILO UTENTE 👤 </p>
      <div className="profilo-box">
        <div className="profilo-info">
          <p><strong>Nome:</strong> {utente.nome}</p>
          <p><strong>Cognome:</strong> {utente.cognome}</p>
          <p><strong>Genere:</strong> {utente.genere}</p>
          <p><strong>Altezza:</strong> {utente.altezza} cm</p>
          <p><strong>Peso:</strong> {utente.peso} kg</p>
          <p><strong>MISURE:</strong></p>
          <p><strong>Addome:</strong> {utente.misure.addome} cm</p>
          <p><strong>Fianchi:</strong> {utente.misure.fianchi} cm</p>
          <p><strong>Coscia:</strong> {utente.misure.coscia} cm</p>
          <p><strong>Obiettivo:</strong> <em>{utente.obiettivo}</em></p>
        </div>
        <div className="profilo-actions">
          <Link to="/pianiCliente">
            <button className="btn-vedi-piani">VEDI PIANI</button>
          </Link>
      </div>
      <TastoIndietro />
     
      <div className="top-left-buttons">
        <Link to="/progressi">
          <button className="btn-progressi">INSERISCI PROGRESSI 📈</button>
        </Link>
      </div>

      <div className="feedback-button-container">
        <button className="btn-feedback">INSERISCI FEEDBACK ✔</button>
      </div>

      </div>
    </div>
  );
}

export default Profilo;
