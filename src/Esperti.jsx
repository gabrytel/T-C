import React from 'react';
import { Link } from 'react-router-dom'; 
import './Esperti.css';

function Esperti() {
    
    return (
        <>
        <div>
        <img src= "/logo.png" alt="logo" 
        className='logoEsperti'/>
        </div>

        <div className='EspertiPage'>
            I NOSTRI ESPERTI
        </div>

        <div className='EspertiText'>
        Il nostro team di esperti è composto da professionisti qualificati e preparati, pronti ad aiutarti a raggiungere i tuoi obiettivi di benessere.
        </div>

        <div>
            <img src = "/coach.png" alt="coach" 
            className='logoCoach'/>
        </div>

        <div className='Coach'>
            <p><strong>Marco Leone: COACH/PERSONAL TRAINER </strong></p>
            
            <p>
                
                 <strong>Esperienza:</strong> specializzato in allenamenti funzionali e programmi di fitness personalizzati.
                
            </p>
            <p>
                <strong>Certificazioni:</strong> laurea in scienze motorie, certificazioni avanzate in personal training e fitness.
            </p>
            <p>
                <strong>Descrizione:</strong> il dr. Leone è esperto nell’aiutarti a raggiungere i tuoi obiettivi fisici attraverso allenamenti mirati e personalizzati. Con un approccio pratico orientato ai risultati, ti supporterà nella definizione muscolare, nella perdita di peso e nell’aumento della forza fisica.
            </p>


        </div>


            
        </>
        );
    }
    
    export default Esperti;