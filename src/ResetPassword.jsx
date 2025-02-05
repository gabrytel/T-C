import React from 'react';
import { Link } from 'react-router-dom'; 
import './ResetPassword.css';

function ResetPassword() 
{
    return (
        <>
        <div>
            <img src= "/logo.png" alt="logo"
            className='logoResetPassword'/>
        </div>

        <div className="RecuperaPassword">
          <label htmlFor="nuova password" className="NuovaPassword">Inserisci nuova password:</label>
          <input type="nuova password" id="nuova password" className="input-NuovaPassword" aria-label="nuova password" />

          <label htmlFor="password" className="NuovaPasswordInserita">Ripeti nuova password:</label>
          <input type="password" id="password" className="input-NuovaPassword" aria-label="password" />
       </div>

       <div className="BottoneResetPassword">
            <Link to="/login">
                <button type="submit" className="button-ResetPassword">Invia</button>
            </Link>
        </div>

        </>

    );
}

export default ResetPassword;