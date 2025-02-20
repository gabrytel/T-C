import React, { useState, useEffect } from 'react';
import './PianoNutrizione.css';
import TastoIndietro from './Componenti/TastoIndietro';

function PianoNutrizione() {
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

        // Recupera il piano nutrizionale (idEsperto = "222")
        const response = await fetch(
          `http://localhost:5000/api/creazione-modifica?email=${encodeURIComponent(userEmail)}&idEsperto=222`
        );

        if (!response.ok) {
          throw new Error('Errore nel recupero del piano nutrizionale dal server.');
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
        console.error('Errore fetch piano nutrizione:', error);
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

  // Se il piano è un oggetto con i giorni come chiavi, visualizza 3 giorni per riga
  return (
    <div className="allenamento-container">
      <img src="/logo.png" alt="logo" className="logoPianoNutrizione" />
      <p className="allenamento-titolo">PIANO NUTRIZIONE</p>
      <div className="exercises-container">
        <div className="days-grid">
          {Object.keys(piano).map((giorno) => (
            <div key={giorno} className="day-container">
              <p className="day-title">{giorno}</p>
              {piano[giorno].map((slot, index) => (
                <div key={index} className="exercise-box">
                  <p>Pasto: {slot.esercizio}</p>
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

export default PianoNutrizione;
