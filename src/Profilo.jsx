// Profilo.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Profilo.css';
import TastoIndietro from './Componenti/TastoIndietro';

function Profilo() {
  const [utente, setUtente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 1) Recupera l'email dal localStorage
    const userEmail = localStorage.getItem("userEmail");

    // 2) Esegui la fetch usando l'email recuperata
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
      {/* Header con titolo a sinistra e pulsante PROGRESSI a destra */}
      <div className="header-profilo">
        <p className="header-title">PROFILO UTENTE</p>
        <div className="header-buttons">
          <button className="btn-progressi">PROGRESSI &#9998;</button>
        </div>
      </div>

      {/* Sezione centrale con info utente a sinistra e icona a destra */}
      <div className="profilo-content">
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

          <p><strong>Obiettivo:</strong> {utente.obiettivo}</p>
        </div>

      </div>


      <div className="profilo-actions">
        {/* Il bottone ora è avvolto in un Link per reindirizzare a /pianiCliente */}
        <Link to="/pianiCliente">
          <button className="btn-vedi-piani">VEDI PIANI</button>
        </Link>
      </div>
    
      <TastoIndietro />
    </div>
  );
}

export default Profilo;
