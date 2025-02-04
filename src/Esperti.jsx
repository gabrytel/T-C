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

        
           <div className='NomeCoach'><p><strong>Marco Leone: COACH/PERSONAL TRAINER </strong></p></div>

           <div>
            <img src = "/coach.png" alt="coach" 
            className='logoCoach'/>
           </div>

           <div className='Coach'>
            
            <p style={{ marginTop: '40px' }}>
                
                 <strong>Esperienza:</strong> specializzato in allenamenti funzionali e programmi di fitness personalizzati.
                
            </p>
            <p>
                <strong>Certificazioni:</strong> laurea in scienze motorie, certificazioni avanzate in personal training e fitness.
            </p>
            <p>
                <strong>Descrizione:</strong> il dr. Leone è esperto nell’aiutarti a raggiungere i tuoi obiettivi fisici attraverso allenamenti mirati e personalizzati. Con un approccio pratico orientato ai risultati, ti supporterà nella definizione muscolare, nella perdita di peso e nell’aumento della forza fisica.
            </p>


        </div>

        <div className='NomeNutrizionista'><p><strong>Anna Costa: NUTRIZIONISTA</strong></p></div>
        <div>
            <img src = "/nutrizionista.png" alt="nutrizionista" 
            className='logoNutrizionista'/>
        </div>

        <div className='Nutrizionista'>
            
            <p style={{ marginTop: '40px' }}>
                
                 <strong>Esperienza:</strong> specializzata in alimentazione equilibrata e nutrizione sportiva per il benessere fisico.
                
            </p>
            <p>
                <strong>Certificazioni:</strong> laurea in scienze della nutrizione, master in nutrizione sportiva e alimentazione.
            </p>
            <p>
                <strong>Descrizione:</strong>  la dr.ssa Costa ti guiderà verso un programma alimentare personalizzato, aiutandoti a raggiungere i tuoi obiettivi di benessere e salute.
                con una passione per l’alimentazione sana, la dr.ssa Costa ti insegnerà a fare scelte nutrizionali informate e bilanciate.
            </p>


        </div>

        <div className='NomePsicologo'><p><strong>Laura Romano: PSICOLOGA</strong></p></div>

        <div>
            <img src = "/psicologo.png" alt="psicologo" 
            className='logoPsicologo'/>
        </div>

        <div className='Psicologo'>
            
            <p style={{ marginTop: '40px' }}>
                
                 <strong>Esperienza:</strong> psicoterapia e gestione dello stress per il benessere mentale.
                
            </p>
            <p>
                <strong>Certificazioni:</strong>  laurea in psicologia, specializzazione in terapia cognitivo-comportamentale.
            </p>
            <p>
                <strong>Descrizione:</strong>  la dr.ssa Romano è specializzata nella gestione dello stress e del benessere mentale. con competenze in terapia cognitivo-comportamentale, la dr.ssa Romani ti aiuterà a gestire le tue emozioni ed a migliorare la tua salute mentale.  
            </p>
        </div>




      
            
        </>
        );
    }
    
    export default Esperti;