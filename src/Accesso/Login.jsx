// Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TastoIndietro from '../Componenti/TastoIndietro';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        
        const data = await response.json();
        
        
        localStorage.setItem("userEmail", data.email);

        console.log('✅ Login riuscito');
       
        navigate('/profilo');
      } else {
        const data = await response.json();
        console.log('❌ Errore nel login:', data);
        setErrorMessage(data.error || 'Email o password errati');
      }
    } catch (error) {
      console.error('Errore durante il login:', error);
      setErrorMessage('Errore del server, riprova più tardi');
    }
  };

  return (
    <>
      <div>
        <img src="/logo.png" alt="logo" className="logoLogin" />
      </div>

      <div className="TastoLoginEsperto">
        <Link to="/loginEsperto">Accesso esperto</Link>
      </div>

      <div className="Credenziali">
        <label htmlFor="email" className="CredenzialiEmail">Email:</label>
        <input
          type="email"
          id="email"
          className="input-field"
          aria-label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password" className="CredenzialiPassword">Password:</label>
        <input
          type="password"
          id="password"
          className="input-field"
          aria-label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="ForgotPassword">
        <Link to="/resetPassword">Password dimenticata?</Link>
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <div>
        <button className="login-button-cliente" onClick={handleLogin}>
          Accedi
        </button>
      </div>

      <div className="OppureTasto">
        Oppure
      </div>

      <div>
        <Link to="/registrazione">
          <button className="register-button">
            Registrati
          </button>
        </Link>
      </div>

      <TastoIndietro />
    </>
  );
}

export default Login;
