import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './accessoPsicologo.css';
import TastoIndietro from '../Componenti/TastoIndietro';

function AccessoPsicologo() {
    const [clienti, setClienti] = useState([]); // Stato per i clienti dal database

    

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
            <div className="TitoloAccessoPsicologo">
                <p>PSICOLOGO</p>
            </div>   

            <div>
                <img src="/logo.png" alt="logo" className='logoAccessoPsicologo' />
            </div>

            {/* Lista Clienti */}
            <div className="ListaClienti">
                <div className="TitoloListaClienti">
                    <p>Lista Clienti Registrati</p>
                </div>
                
                <ul>

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

            <TastoIndietro />
        </>
    );
}

export default AccessoPsicologo;
