import React from 'react';
import { Link } from 'react-router-dom'; 
import TastoIndietro from './Componenti/TastoIndietro';
import './ChiSiamo.css';

function ChiSiamo() 
{
    return (
        <>
    <div>
      <img src= "/logo.png" alt="logo" 
      className='logoChiSiamo'
      />
    </div>

        <div className="ChiSiamoPage">
            <h5>CHI SIAMO?</h5>
            
        </div>

        <div className="ChiSiamoText">
            <p>
            Oggi più che mai, la ricerca di soluzioni per il benessere delle persone si estende oltre l’alimentazione e il fitness, includendo anche la salute mentale, la crescita personale e le relazioni sociali.
            In risposta a questa esigenza, abbiamo creato una piattaforma integrata che riunisce 3 professionisti (nutrizionista, psicologo, trainer) per offrire un supporto olistico e personalizzato ad ogni utente.
            </p>
            <p>
            La nostra idea è fornire un servizio coordinato in cui ciascun esperto è in grado di gestire autonomamente il proprio profilo, indicando certificazioni, esperienza e foto.
            </p>
            <p>
            I clienti possono lasciare report sui progressi e ricevere consigli personalizzati. Il nostro sistema consente di inviare programmi di allenamento, diete e supporto su misura. Con una visione integrata e collaborativa, il nostro obiettivo è supportare ogni aspetto del benessere dell’individuo, favorendo la crescita personale ed il raggiungimento di uno stato di equilibrio e salute completo.
            </p>
        </div>
        <TastoIndietro />
        </>
    );
}

export default ChiSiamo;