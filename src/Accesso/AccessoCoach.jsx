
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './accessoCoach.css';

function AccessoCoach() {
    const [clienti, setClienti] = useState([]); // Stato per i clienti dal database

    // 🔥 Clienti manuali inseriti direttamente
    const clientiManuali = [
        { nome: "Giulia", cognome: "Bianchi", email: "giulia.bianchi@email.com", telefono: "3291234567" },
        { nome: "Marco", cognome: "Verdi", email: "marco.verdi@email.com", telefono: "3487654321" }
    ];

    // 🔥 Effettua una chiamata API per ottenere i clienti dal database
    useEffect(() => {
        axios.get('http://localhost:5000/clienti')
            .then(response => {
                setClienti(response.data); // Salva i clienti dal database
            })
            .catch(error => {
                console.error("Errore nel recupero clienti:", error);
            });
    }, []);

    return (
        <>
            <div className="TitoloAccessoCoach">
                <p>COACH/PERSONAL TRAINER</p>
            </div>   

            <div>
                <img src="/logo.png" alt="logo" className='logoAccessoCoach' />
            </div>

            {/* Lista Clienti */}
            <div className="ListaClienti">
                <h2>Lista Clienti Registrati</h2>
                <ul>
                    {/* 🔥 Mostra i clienti manuali */}
                    {clientiManuali.map((cliente, index) => (
                        <li key={`manuale-${index}`}>
                            <strong>{cliente.nome} {cliente.cognome}</strong> - {cliente.email} - {cliente.telefono}
                        </li>
                    ))}

                    {/* 🔥 Mostra i clienti dal database */}
                    {clienti.map((cliente, index) => (
                        <li key={`db-${index}`}>
                            <strong>{cliente.nome} {cliente.cognome}</strong> - {cliente.email} - {cliente.telefono}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default AccessoCoach;
