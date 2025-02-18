import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import TastoIndietro from "../Componenti/TastoIndietro";
import "./ClienteDettaglio.css"; // Import del CSS puro

function ClienteDettaglio() {
  const { email } = useParams();
  const [cliente, setCliente] = useState(null);
  const idEsperto = sessionStorage.getItem("idEsperto"); // 🔥 Recupera ID esperto

  useEffect(() => {
    console.log(`🔍 Richiesta dati per cliente con email: ${email}`);

    axios
      .get(`http://localhost:5000/clienti/email/${encodeURIComponent(email)}`)
      .then((response) => {
        console.log("✅ Dati ricevuti:", response.data);
        setCliente(response.data);
      })
      .catch((error) => {
        console.error("❌ Errore nel recupero del cliente:", error);
      });
  }, [email]);

  if (!cliente) {
    return (
      <div className="loading-container">
        <p>Caricamento...</p>
      </div>
    );
  }

  return (
    <div className="cliente-container">
      {/* Icona Fotocamera */}
      <img src="/fotoProfilo.png" alt="Foto Profilo" className="camera-img" />

      <div>
        <img src="/logo.png" alt="logo" className="logoClienteDettaglio" />
      </div>

      {/* Dettagli Cliente */}
      <div className="cliente-dettaglio">
        <p><strong>Nome:</strong> {cliente.nome}</p>
        <p><strong>Cognome:</strong> {cliente.cognome}</p>
        <p><strong>Altezza:</strong> {cliente.altezza} cm</p>
        <p><strong>Peso:</strong> {cliente.peso} kg</p>

        <p><strong>MISURE</strong></p>
        <p><strong>Addome:</strong> {cliente.addome} cm</p>
        <p><strong>Fianchi:</strong> {cliente.fianchi} cm</p>
        <p><strong>Coscia:</strong> {cliente.coscia} cm</p>

        <p><strong>Obiettivi:</strong></p>
        <p className="cliente-obiettivo">{cliente.obiettivo}</p>
      </div>

      {/* Pulsanti */}
      <div className="bottoni-container">
        <button className="btn-video">📹 AVVIA VIDEOCHIAMATA</button>

        {/* Usa l'idEsperto per costruire il link dinamico */}
        <Link to={`/creazioneModifica/${encodeURIComponent(email)}/${idEsperto}`}>
          <button className="btn-piano">➕ CREA PIANO</button>
        </Link>

        <Link to={`/creazioneModifica/${encodeURIComponent(email)}/${idEsperto}`}>
          <button className="btn-modifica">✏️ MODIFICA PIANO</button>
        </Link>
      </div>

      {/* Pulsante Indietro */}
      <div className="pulsante-indietro">
        <TastoIndietro />
      </div>
    </div>
  );
}

export default ClienteDettaglio;
