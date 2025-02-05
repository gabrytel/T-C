import React from 'react';
import { Link } from 'react-router-dom'; 
import './Registrazione.css';

function Registrazione()
{
  return (
    <>
    <div>
    <img src= "/logo.png" alt="logo"
    className='logoRegistrazione'/>
    </div>

    <p className="Registrazione">Registrazione</p>

    <div class="container">

    <div className="DatiRegistrazione">

      <div className="campo">
        <label htmlFor="codiceFiscale" className="CF">Inserisci codice fiscale:</label>
        <input 
          type="text" 
          id="codiceFiscale" 
          className="input-DatiRegistrazione" 
          aria-label="codice fiscale" 
        />
      </div>

      <div className="campo">
        <label htmlFor="nome" className="NomeUtente">Inserisci nome:</label>
        <input 
          type="text" 
          id="nome" 
          className="input-DatiRegistrazione" 
          aria-label="nome" 
        />
      </div>

      <div className="campo">
        <label htmlFor="cognome" className="CognomeUtente">Inserisci cognome:</label>
        <input 
          type="text" 
          id="cognome" 
          className="input-DatiRegistrazione" 
          aria-label="cognome" 
        />
      </div>

      <div className="campo">
        <label htmlFor="mail" className="MailUtente">Inserisci email:</label>
        <input 
          type="text" 
          id="mail" 
          className="input-DatiRegistrazione" 
          aria-label="mail" 
        />
      
      </div>

      <div className="campo">
        <label htmlFor="passwordUtente" className="PasswordUtente">Inserisci password:</label>
        <input 
          type="text" 
          id="passwordUtente" 
          className="input-DatiRegistrazione" 
          aria-label="passwordUtente" 
        />
        
      </div>

    </div>
    <img src= "/registrazione.png" alt="registrazione"
    className='imgRegistrazione'/>

    </div>

    <div className="BottoneDatiRegistrazione">
           
      <button type="submit" className="button-DatiRegistrazione">Invia</button>
           
    </div>

    </>
  );
}

export default Registrazione;