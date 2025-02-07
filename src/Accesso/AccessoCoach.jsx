import React from 'react';
import { Link } from 'react-router-dom'; 
import './accessoCoach.css';

function AccessoCoach() 
{
    return (
        <>
            <div className="TitoloAccessoCoach">
                <p>COACH/PERSONAL TRAINER</p>
            </div>   

            <div>
                <img src="/logo.png" alt="logo" 
                className='logoAccessoCoach'
                />
            </div>

            
        </>
    );
}

export default AccessoCoach;