import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import TastoIndietro from '../Componenti/TastoIndietro';
import './ClienteDettaglio.css';

function ClienteDettaglio() {
    const { email } = useParams(); // Ottieni l'email dalla URL
    const [cliente, setCliente] = useState(null); // Stato per il cliente

    useEffect(() => {
        console.log(`🔍 Richiesta dati per cliente con email: ${email}`);

        axios.get(`http://localhost:5000/clienti/email/${encodeURIComponent(email)}`)
            .then(response => {
                console.log("✅ Dati ricevuti:", response.data);
                setCliente(response.data);
            })
            .catch(error => {
                console.error("❌ Errore nel recupero del cliente:", error);
            });
    }, [email]);

    if (!cliente) {
        return <p>Caricamento...</p>;
    }

    return (
        <div className="cliente-dettaglio">
            <p><strong>Dettagli Cliente:</strong> {cliente.nome} {cliente.cognome}</p>
            <p><strong>Codice Fiscale:</strong> {cliente.cf}</p>
            <p><strong>Email:</strong> {cliente.email}</p>
            <p><strong>Telefono:</strong> {cliente.telefono}</p>
            <p><strong>Data di Nascita:</strong> {cliente.dataDiNascita}</p>
            <p><strong>Genere:</strong> {cliente.genere}</p>
            <p><strong>Obiettivi:</strong></p>
            <p>{cliente.obiettivo}</p>

            <TastoIndietro />
        </div>
    );
}

export default ClienteDettaglio;
