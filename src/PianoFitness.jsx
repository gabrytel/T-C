import React, { useState, useEffect } from 'react';
import './PianoFitness.css';
import TastoIndietro from './Componenti/TastoIndietro';

function PianoFitness() {
  const [piano, setPiano] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    async function fetchPiano() {
      try {
        const userEmail = localStorage.getItem('userEmail');
        if (!userEmail) {
          setErrorMsg('Nessuna email trovata. Effettua il login.');
          return;
        }

        const response = await fetch(
          `http://localhost:5000/api/pianoFitness?email=${encodeURIComponent(userEmail)}`
        );
        if (!response.ok) {
          throw new Error('Errore nel recupero del piano fitness dal server.');
        }
        const data = await response.json();

        if (data.workoutPlan) {
          setPiano(data.workoutPlan);
        } else {
          setPiano(null);
          if (data.message) {
            setErrorMsg(data.message);
          }
        }
      } catch (error) {
        console.error('Errore fetch piano fitness:', error);
        setErrorMsg('Si è verificato un errore durante il recupero del piano.');
      }
    }
    fetchPiano();
  }, []);

  if (errorMsg) {
    return <p className="errore-piano">{errorMsg}</p>;
  }

  if (!piano) {
    return <p>Nessun piano da mostrare.</p>;
  }

  // Ora avvolgiamo i giorni in un contenitore con classe "days-grid"
  return (
    <div className="allenamento-container">
      <img src="/logo.png" alt="logo" className="logoPianoFitness" />
      <p className="allenamento-titolo">ALLENAMENTO</p>
      <div className="exercises-container">
        <div className="days-grid">
          {Object.keys(piano).map((giorno) => (
            <div key={giorno} className="day-container">
              <p className="day-title">{giorno}</p>
              {piano[giorno].map((slot, index) => (
                <div key={index} className="exercise-box">
                  <p>Esercizio: {slot.esercizio}</p>
                  <p>Ripetizioni: {slot.ripetizioni}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <TastoIndietro />
    </div>
  );
}

export default PianoFitness;
