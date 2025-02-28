import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TastoIndietro from "../Componenti/TastoIndietro";
import "./CreazioneModifica.css"; 

const CreazioneModifica = () => {
  const { email, idEsperto } = useParams();
  const idEspertoSession = sessionStorage.getItem("idEsperto");

  
  const idEspertoFinale = idEsperto || idEspertoSession;

  const titoliEsperti = {
    "111": "Personal Trainer",
    "222": "Nutrizionista",
    "333": "Psicologo"
  };

  const titolo = titoliEsperti[idEspertoFinale?.trim()] || "Professionista";

  const giorniSettimana = ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato", "Domenica"];

  // Stato iniziale: un piano con 7 giorni x 6 slot
  const [workoutPlan, setWorkoutPlan] = useState(() =>
    giorniSettimana.reduce((acc, giorno) => {
      acc[giorno] = Array(6).fill({ esercizio: "", ripetizioni: "", descrizione: "" });
      return acc;
    }, {})
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [noPlanMessage, setNoPlanMessage] = useState("");

  
  useEffect(() => {
    if (email && idEspertoFinale) {
      fetch(
        `http://localhost:5000/api/creazione-modifica?email=${encodeURIComponent(email)}&idEsperto=${encodeURIComponent(idEspertoFinale)}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            
            setError(data.error);
          } else if (data.workoutPlan) {
           
            setWorkoutPlan(data.workoutPlan);
          } else {
            
            setNoPlanMessage(data.message || "Nessun piano trovato, creane uno nuovo.");
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("❌ Errore nel fetch:", err);
          setError("Errore nel caricamento");
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [email, idEspertoFinale]);

  // Gestisce i cambi degli input
  const handleChange = (giorno, index, field, value) => {
    setWorkoutPlan((prevPlan) => {
      const updatedPlan = { ...prevPlan };
      updatedPlan[giorno] = [...updatedPlan[giorno]];
      updatedPlan[giorno][index] = { ...updatedPlan[giorno][index], [field]: value };
      return updatedPlan;
    });
  };

  // Salva il piano (POST)
  const handleSave = () => {
    setError("");
    setSuccessMessage("");
    setNoPlanMessage("");

    fetch("http://localhost:5000/api/creazione-modifica", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        idEsperto: idEspertoFinale,
        workoutPlan
      })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setSuccessMessage("✅ Piano salvato con successo!");
          setTimeout(() => setSuccessMessage(""), 6000);
        }
      })
      .catch((err) => {
        console.error("❌ Errore:", err);
        setError("Errore nel salvataggio, riprova!");
      });
  };

  if (loading) {
    return <p>Caricamento in corso...</p>;
  }

  return (
    <div className="containerPiano">
      <p className="titlePiano">{titolo}</p>

      {error && <p className="error-text">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      {noPlanMessage && <p className="no-plan-message">{noPlanMessage}</p>}

      <div className="workout-container">
        {giorniSettimana.map((giorno) => (
          <div key={giorno} className="giorno-container">
            <p className="giorno-title">{giorno}</p>
            {workoutPlan[giorno].map((attivita, i) => (
              <div key={i} className="exercise-row">
                <input
                  type="text"
                  placeholder={
                    idEspertoFinale === "111"
                      ? `Esercizio ${i + 1}`
                      : idEspertoFinale === "222"
                      ? `Pasto ${i + 1}`
                      : `Attività ${i + 1}`
                  }
                  value={attivita.esercizio}
                  onChange={(e) => handleChange(giorno, i, "esercizio", e.target.value)}
                />

                {idEspertoFinale === "111" && (
                  <input
                    type="number"
                    placeholder="Ripetizioni"
                    value={attivita.ripetizioni}
                    onChange={(e) => handleChange(giorno, i, "ripetizioni", e.target.value)}
                  />
                )}

                {idEspertoFinale === "333" && (
                  <textarea
                    placeholder="Note / Esercizi di rilassamento"
                    value={attivita.descrizione}
                    onChange={(e) => handleChange(giorno, i, "descrizione", e.target.value)}
                  />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="button-containerPiano">
        <button type="button" className="submit-button" onClick={handleSave}>
          Salva Piano
        </button>
      </div>

      <TastoIndietro />
    </div>
  );
};

export default CreazioneModifica;
