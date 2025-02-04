import React from 'react';
import { Link } from 'react-router-dom';
import './Contatti.css';

function Contatti() 
{
    return (
        <>
    <div>
      <img src= "/logo.png" alt="logo" 
      className='logoContatti'
      />
    </div>
    
        <div className="ContattiPage">
            <h5>CONTATTI</h5>
            
        </div>

        <div className="ContattiText">
          <p>
            Benvenuto nella nostra pagina di contatto! Siamo lieti di offrirti assistenza e rispondere a qualsiasi domanda tu possa avere.
          </p>
          <p>
            La nostra piattaforma si impegna a fornire un servizio di alta qualità, mettendo al centro la soddisfazione del cliente.
            Il nostro team di esperti è a tua disposizione per offrirti supporto personalizzato e consigli mirati.
          </p>
          <p>
            <strong>Gilda Natasha Caporusso: gildacaporusso@gmail.com</strong>
          </p>
          <p>
            <strong>Gabriella Telegrafo: gabriellatelegrafo11@gmail.com</strong>
          </p>
          <p>
            Se hai bisogno di ulteriori dettagli sui nostri servizi o desideri una consulenza personalizzata, non esitare a metterti in contatto con noi.
          </p>
          <p>
            Grazie per aver scelto di contattarci. Il tuo feedback è prezioso per migliorare continuamente il nostro servizio.
            Siamo qui per aiutarti e rendere la tua esperienza la migliore possibile!
          </p>
        </div>

    </>
    );
}

export default Contatti;

       