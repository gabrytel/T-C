import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './accessoNutrizionista.css';

function AccessoNutrizionista() {
    const [clienti, setClienti] = useState([]); // Stato per i clienti dal database
    const navigate = useNavigate(); // Hook per navigare indietro

    // Clienti manuali inseriti direttamente
    const clientiManuali = [
        { id: 1, nome: "Lucia", cognome: "Petrulli" },
        { id: 2, nome: "Gabriele", cognome: "Ricci" },

    ];

    // Effettua una chiamata API per ottenere i clienti dal database
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
            <div className="TitoloAccessoNutrizionista">
                <p>NUTRIZIONISTA</p>
            </div>   

            <div>
                <img src="/logo.png" alt="logo" className='logoAccessoNutrizionista' />
            </div>

            {/* Lista Clienti */}
            <div className="ListaClienti">
                <div className="TitoloListaClienti">
                    <p>Lista Clienti Registrati</p>
                </div>
                
                <ul>
                    {/* Clienti manuali */}
                    {clientiManuali.map((cliente) => (
                        <li key={`manuale-${cliente.id}`}>
                            <Link to={`/cliente/${cliente.id}`} className="cliente-button">
                                {cliente.nome} {cliente.cognome}
                            </Link>
                        </li>
                    ))}

                    {/* Clienti dal database */}
                    {clienti.map((cliente) => (
                        <li key={`db-${cliente.id}`}>
                            <Link to={`/cliente/${cliente.id}`} className="cliente-button">
                                {cliente.nome} {cliente.cognome}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Bottone Torna Indietro */}
            <button className="back-button" onClick={() => navigate(-1)}>
                Torna indietro
            </button>
        </>
    );
}

export default AccessoNutrizionista;
