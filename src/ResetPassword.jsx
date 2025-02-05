import React from 'react';
import { Link } from 'react-router-dom'; 
import './ResetPassword.css';
import TastoIndietro from './Componenti/TastoIndietro';

function ResetPassword() 
{
    return (
        <>
        <div>
            <img src= "/logo.png" alt="logo"
            className='logoResetPassword'/>
        </div>

        <div className='TitoloPiattaformaResetPassword'>
        <p>
            <strong> 
                Piano di benessere a 360°
            </strong>
        </p>
        </div>

        <div className='TitoloResetPassword'>
        <p>RECUPERA PASSWORD</p>
        </div>

        <div className="RecuperaPassword">
          <label htmlFor="nuova email" className="NuovaMail">Inserisci email :</label>
          <input type="email" id="email" className="input-NuovaMail" aria-label="email" />

       </div>

       <div>
            <Link to="/login">
                <button type="submit" className="button-ResetPassword">Invia</button>
            </Link>
        </div>

        <TastoIndietro />

        </>

    );
}

export default ResetPassword;