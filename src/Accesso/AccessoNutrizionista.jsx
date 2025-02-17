import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './accessoNutrizionista.css';
import TastoIndietro from '../Componenti/TastoIndietro'; 

function AccessoNutrizionista() {
    const [clienti, setClienti] = useState([]); 
    const navigate = useNavigate(); 

    
    useEffect(() => {
        axios.get('http://localhost:5000/clienti')
            .then(response => {
                setClienti(response.data); 
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

            
            <div className="ListaClienti">
                <div className="TitoloListaClienti">
                    <p>Lista Clienti Registrati</p>
                </div>
                
            <div>
             <ul>
             {clienti.length > 0 ? (
                 clienti.map((cliente) => (
                    <li key={cliente.email}>
                        <Link to={`/clienteDettaglio/${encodeURIComponent(cliente.email)}`} className="cliente-button">
                            {cliente.nome} {cliente.cognome}
                        </Link> 
                    </li>
                    ))
                    ) : (
                     <p>Nessun cliente registrato.</p>
            )}
            </ul>
            </div>
            <TastoIndietro />
            </div>
        </>
        
    );
}

export default AccessoNutrizionista;
