import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Profilo.css';
import TastoIndietro from './Componenti/TastoIndietro';

function Profilo() {
  const [cliente, setCliente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleDelete = (email) => {
    fetch(`http://localhost:5000/cliente/email/${email}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Errore nell'eliminazione del profilo");
        }
        // Se va a buon fine, rimuovi dal localStorage e reindirizza al login
        localStorage.removeItem("userEmail");
        window.location.href = '/login';
      })
      .catch(err => {
        console.error(err);
        alert("Errore nell'eliminazione del profilo");
      });
  };
  
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

      {/* Dropdown Menu */}
      <div className="dropdown-menu-container">
        <button onClick={toggleDropdown} className="dropdown-button">Menu</button>
        {dropdownOpen && (
          <div className="dropdown-content">
            <Link to="/login" className="dropdown-item">Log out</Link>
            <button className="dropdown-item" onClick={() => handleDelete(cliente.email)}>Elimina profilo</button>
          </div>
        )}
      </div>

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
        {/* Rimosso il vecchio bottone "Elimina profilo" in favore del menu a tendina */}
        {/*
        <button className="button-cliente-elimina" onClick={() => handleDelete(cliente._email)}>Elimina profilo</button>
        */}
      </div>
    </div>
  );
}

export default Profilo;
