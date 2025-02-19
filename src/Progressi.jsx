import React, { useState, useEffect } from 'react';
import './Progressi.css';
import TastoIndietro from './Componenti/TastoIndietro';

function Progressi() {
  const [progressData, setProgressData] = useState({
    peso: '',
    addome: '',
    fianchi: '',
    coscia: '',
    altezza: ''
  });

  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setUserEmail(storedEmail);
    }
  }, []);

  const handleChange = (e) => {
    setProgressData({
      ...progressData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userEmail) {
      alert("Email utente non trovata. Effettua il login.");
      return;
    }

    const dataToSend = { ...progressData, email: userEmail };

    try {
      const response = await fetch('http://localhost:5000/api/progressi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        alert("Dati progressi salvati correttamente!");
      } else {
        alert("Errore durante il salvataggio dei dati.");
      }
    } catch (error) {
      console.error("Errore nella richiesta:", error);
      alert("Errore nella connessione al server.");
    }
  };

  return (
    <div className="progress-container">
      <img src="/logo.png" alt="logo" className="logoProgressi" />
      <p className="progress-title">DATI PROGRESSI</p>
      <form onSubmit={handleSubmit} className="progress-form">
        <div className="progress-box">
          <div className="progress-content">
            <div className="progress-inputs">
              <label>
                Peso attuale:
                <input 
                  type="text" 
                  name="peso" 
                  className="input-field" 
                  value={progressData.peso} 
                  onChange={handleChange} 
                /> kg
              </label>
              <label>
                Addome:
                <input 
                  type="text" 
                  name="addome" 
                  className="input-field" 
                  value={progressData.addome} 
                  onChange={handleChange} 
                /> cm
              </label>
              <label>
                Fianchi:
                <input 
                  type="text" 
                  name="fianchi" 
                  className="input-field" 
                  value={progressData.fianchi} 
                  onChange={handleChange} 
                /> cm
              </label>
              <label>
                Coscia:
                <input 
                  type="text" 
                  name="coscia" 
                  className="input-field" 
                  value={progressData.coscia} 
                  onChange={handleChange} 
                /> cm
              </label>
              <label>
                Altezza:
                <input 
                  type="text" 
                  name="altezza" 
                  className="input-field" 
                  value={progressData.altezza} 
                  onChange={handleChange} 
                /> cm
              </label>
            </div>
          </div>
        </div>
        <button type="submit" className="btn-submit">Salva progressi</button>
      </form>
      <TastoIndietro />
    </div>
  );
}

export default Progressi;
