import React from 'react';
import './loginEsperto.css';
import TastoIndietro from '../Componenti/TastoIndietro';
import { Link } from 'react-router-dom';

function LoginEsperto() {
  return (
    <>
    <div>
      <img src= "/logo.png" alt="logo" 
      className='logoLoginEsperto'
      />
    </div>
    
    <div>
      <img src= "/ESPERTO.png" alt="loginEsperto"
      className='loginEspertoImg'
      />
    </div>

    <div className='loginEsperto'>
      <p>
        <strong>
          Login Esperto
        </strong>
      </p>
    </div>

      <div className="IDesperto">

          <label htmlFor="numero" className="EspertoCodiceID">ID Esperto:</label>
          <input type="numero" id="numero" className="input-ID" aria-label="numero" />

      </div>

      <div>
        
          <button className="login-button-esperto">
            Accedi
          </button>
      </div>
        
        

    <TastoIndietro />
     
    
    </>
  );
}

export default LoginEsperto;