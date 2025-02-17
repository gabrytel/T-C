import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './loginEsperto.css';
import TastoIndietro from '../Componenti/TastoIndietro';

function LoginEsperto() {
  const [idEsperto, setIdEsperto] = useState('');
  const [errore, setErrore] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (idEsperto === '111' || idEsperto === '222' || idEsperto === '333') {
      sessionStorage.setItem("idEsperto", idEsperto); // Salva l'ID esperto
      console.log("🔹 ID Esperto salvato:", idEsperto);

      switch (idEsperto) {
        case '111':
          navigate('/accessoCoach');
          break;
        case '222':
          navigate('/accessoNutrizionista');
          break;
        case '333':
          navigate('/accessoPsicologo');
          break;
        default:
          setErrore('ID non valido. Riprova.');
          break;
      }
    } else {
      setErrore('ID non valido. Inserisci un ID corretto.');
    }
  };

  return (
    <div className="login-container">
      <div>
        <img src="/logo.png" alt="logo" className="logoLoginEsperto" />
      </div>

      <div>
        <img src="/ESPERTO.png" alt="loginEsperto" className="loginEspertoImg" />
      </div>

      <div className="loginEsperto">
        <p>
          <strong>Login Esperto</strong>
        </p>
      </div>

      <div className="IDesperto">
        <label htmlFor="numero" className="EspertoCodiceID">ID Esperto:</label>
        <input
          type="password"
          id="numero"
          className="input-ID"
          aria-label="numero"
          value={idEsperto}
          onChange={(e) => setIdEsperto(e.target.value)}
        />
      </div>

      {errore && <p className="errore-messaggio">{errore}</p>}

      <div>
        <button className="login-button-esperto" onClick={handleLogin}>
          Accedi
        </button>
      </div>

      <TastoIndietro />
    </div>
  );
}

export default LoginEsperto;
