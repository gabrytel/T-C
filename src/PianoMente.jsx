import React, { useState, useEffect } from 'react';
import './PianoMente.css';
import TastoIndietro from './Componenti/TastoIndietro';

function PianoMente() {
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

        // Recupera il piano dello psicologo (idEsperto = "333")
        const response = await fetch(
          `http://localhost:5000/api/creazione-modifica?email=${encodeURIComponent(userEmail)}&idEsperto=333`
        );

        if (!response.ok) {
          throw new Error('Errore nel recupero del piano dal server.');
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
        console.error('Errore fetch piano mente:', error);
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

  // Se "piano" è un oggetto con i giorni come chiavi, mostriamo 3 giorni per riga
  return (
    <div className="allenamento-container">
      <img src="/logo.png" alt="logo" className="logoPianoMente" />
      <p className="allenamento-titolo">PIANO MENTE</p>
      <div className="exercises-container">
        <div className="days-grid">
          {Object.keys(piano).map((giorno) => (
            <div key={giorno} className="day-container">
              <p className="day-title">{giorno}</p>
              {piano[giorno].map((slot, index) => (
                <div key={index} className="exercise-box">
                  {/* Per il piano mente, puoi mostrare l'attività (es. "Attività" o "Esercizio") e eventuali note */}
                  <p>Attività: {slot.esercizio}</p>
                  {/* Se vuoi non mostrare le note, rimuovi la riga seguente */}
                  {/* <p>Note: {slot.descrizione}</p> */}
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

export default PianoMente;
