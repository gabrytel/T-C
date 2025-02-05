import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

function Login() 
{
  return (
    <>
    <div>
    <img src= "/logo.png" alt="logo"
    className='logoLogin'/>
    </div>

    <div className='TastoLoginEsperto'>
    {/*creami un tasto che mi porta alla pagina di login esperto*/}
    <a href="/loginEsperto">Accesso esperto</a>
    </div>

   
    <div className="Credenziali">
          <label htmlFor="email" className="CredenzialiEmail">Email:</label>
          <input type="email" id="email" className="input-field" aria-label="Email" />

          <label htmlFor="password" className="CredenzialiPassword">Password:</label>
          <input type="password" id="password" className="input-field" aria-label="Password" />
    </div>

    <div className="ForgotPassword">
        <Link to="/resetPassword">Password dimenticata?</Link>
    </div>

   <div>
    <Link to="/pianiCliente">
      <button className="login-button-cliente">
        Accedi
      </button>
    </Link>
    </div>

    <div className = 'OppureTasto'>
      Oppure
    </div> 


    <div>
    <Link to="/registrazione">
      <button className="register-button">
        Registrati
      </button>
    </Link>
    </div>

    

    
   


   </>
  );
  
}

export default Login;