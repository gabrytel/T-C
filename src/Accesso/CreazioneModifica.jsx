import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TastoIndietro from "../Componenti/TastoIndietro";
import "./CreazioneModifica.css"; // Importa il CSS aggiornato

const CreazioneModifica = () => {
  const { email } = useParams();
  const giorni = ["Lunedì", "Mercoledì", "Venerdì"];

  const [workoutPlan, setWorkoutPlan] = useState({
    Lunedì: Array(6).fill({ esercizio: "", ripetizioni: "" }),
    Mercoledì: Array(6).fill({ esercizio: "", ripetizioni: "" }),
    Venerdì: Array(6).fill({ esercizio: "", ripetizioni: "" }),
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("Email ricevuta:", email);

    if (email) {
      fetch(`http://localhost:5000/clienti/email/${encodeURIComponent(email)}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Piano di allenamento non trovato");
          }
          return res.json();
        })
        .then((data) => {
          console.log("Dati ricevuti:", data);
          setWorkoutPlan(data.workoutPlan || workoutPlan);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Errore nel fetch:", err);
          setError(err.message);
          setLoading(false);
        });
    }
  }, [email]);

  const handleChange = (giorno, index, field, value) => {
    setWorkoutPlan((prevPlan) => {
      const updatedPlan = { ...prevPlan };
      updatedPlan[giorno] = [...updatedPlan[giorno]];
      updatedPlan[giorno][index] = { ...updatedPlan[giorno][index], [field]: value };
      return updatedPlan;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/api/CreazioneModifica", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, workoutPlan }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Errore durante il salvataggio del piano");
        }
        return res.json();
      })
      .then((data) => {
        setWorkoutPlan(data.workoutPlan);
        setError(""); 
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div className="container">
      <p className="title">Personal Trainer</p>
      {loading ? (
        <p className="error-text">Caricamento piano...</p>
      ) : error ? (
        <p className="error-text">{error}</p>
      ) : (
        <>
          <div className="workout-container">
            {giorni.map((giorno) => (
              <div key={giorno} className="giorno-container">
                <p className="giorno-title">{giorno}</p>
                {workoutPlan[giorno].map((esercizio, index) => (
                  <div key={index} className="exercise-row">
                    <input
                      type="text"
                      placeholder={`Esercizio ${index + 1}`}
                      value={esercizio.esercizio}
                      onChange={(e) => handleChange(giorno, index, "esercizio", e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder="Ripetizioni"
                      value={esercizio.ripetizioni}
                      onChange={(e) => handleChange(giorno, index, "ripetizioni", e.target.value)}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="button-container">
            <button type="submit" className="submit-button" onClick={handleSubmit}>
              Salva Piano
            </button>
          </div>
        </>
      )}
      <TastoIndietro />
    </div>
  );
};

export default CreazioneModifica;
