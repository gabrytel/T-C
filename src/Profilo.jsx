import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Profilo.css';
import TastoIndietro from './Componenti/TastoIndietro';

function Profilo() {
  const [cliente, setCliente] = useState(null);
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
        setCliente(data);
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
      <img src="/logo.png" alt="logo" className="logoProfilo" />
      <p className="profilo-title">PROFILO UTENTE 👤 </p>
      <div className="profilo-box">
        <div className="profilo-info">
          <p><strong>Nome:</strong> {cliente.nome}</p>
          <p><strong>Cognome:</strong> {cliente.cognome}</p>
          <p><strong>Genere:</strong> {cliente.genere}</p>
          <p><strong>MISURE:</strong></p>
          <p><strong>Addome:</strong> {cliente.misure?.addome || "N/D"} cm</p>
          <p><strong>Fianchi:</strong> {cliente.misure?.fianchi || "N/D"} cm</p>
          <p><strong>Coscia:</strong> {cliente.misure?.coscia || "N/D"} cm</p>
          <p><strong>Altezza:</strong> {cliente.altezza || "N/D"} cm</p>
          <p><strong>Peso:</strong> {cliente.peso || "N/D"} kg</p>

          <p><strong>Obiettivo:</strong> <em>{cliente.obiettivo || "N/D"}</em></p>
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
