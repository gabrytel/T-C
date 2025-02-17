import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TastoIndietro from "../Componenti/TastoIndietro";
import "./CreazioneModifica.css"; 

const CreazioneModifica = () => {
  const { email, idEsperto } = useParams();
  const idEspertoSession = sessionStorage.getItem("idEsperto"); 

  console.log("📌 Email ricevuta:", email);
  console.log("📌 ID Esperto ricevuto:", idEsperto);
  console.log("📌 ID Esperto da sessione:", idEspertoSession);

  const idEspertoFinale = idEsperto || idEspertoSession;

  const titoliEsperti = {
    "111": "Personal Trainer",
    "222": "Nutrizionista",
    "333": "Psicologo"
  };

  const titolo = titoliEsperti[idEspertoFinale?.trim()] || "Professionista";

  console.log("📝 Titolo selezionato:", titolo);

  // Definiamo tutti i giorni della settimana
  const giorniSettimana = ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato", "Domenica"];

  // Stato per il piano, con tutti i giorni della settimana
  const [workoutPlan, setWorkoutPlan] = useState(() => {
    return giorniSettimana.reduce((acc, giorno) => {
      acc[giorno] = Array(6).fill({ esercizio: "", ripetizioni: "", descrizione: "" });
      return acc;
    }, {});
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (email) {
      fetch(`http://localhost:5000/clienti/email/${encodeURIComponent(email)}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Piano non trovato");
          }
          return res.json();
        })
        .then((data) => {
          console.log("✅ Dati ricevuti:", data);
          setWorkoutPlan(data.workoutPlan || workoutPlan);
          setLoading(false);
        })
        .catch((err) => {
          console.error("❌ Errore nel fetch:", err);
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

  return (
    <div className="containerPiano">
      <p className="titlePiano">{titolo}</p>

      {loading ? (
        <p className="error-text">Caricamento piano...</p>
      ) : error ? (
        <p className="error-text">{error}</p>
      ) : (
        <>
          <div className="workout-container">
            {giorniSettimana.map((giorno) => (
              <div key={giorno} className="giorno-container">
                <p className="giorno-title">{giorno}</p>

                {workoutPlan[giorno].map((attivita, index) => (
                  <div key={index} className="exercise-row">
                    <input
                      type="text"
                      placeholder={
                        idEspertoFinale === "111"
                          ? `Esercizio ${index + 1}`
                          : idEspertoFinale === "222"
                          ? `Pasto ${index + 1}`
                          : `Attività ${index + 1}`
                      }
                      value={attivita.esercizio}
                      onChange={(e) => handleChange(giorno, index, "esercizio", e.target.value)}
                    />

                    {idEspertoFinale === "111" && (
                      <input
                        type="number"
                        placeholder="Ripetizioni"
                        value={attivita.ripetizioni}
                        onChange={(e) => handleChange(giorno, index, "ripetizioni", e.target.value)}
                      />
                    )}

                    {idEspertoFinale === "333" && (
                      <textarea
                        placeholder="Note / Esercizi di rilassamento"
                        value={attivita.descrizione}
                        onChange={(e) => handleChange(giorno, index, "descrizione", e.target.value)}
                      />
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="button-containerPiano">
            <button type="submit" className="submit-button">Salva Piano</button>
          </div>
        </>
      )}
      <TastoIndietro />
    </div>
  );
};

export default CreazioneModifica;
