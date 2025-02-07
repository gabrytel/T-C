import React from 'react';
import { Link } from 'react-router-dom'; 
import './accessoPsicologo.css';

function AccessoPsicologo()
{
    return (
        <>
            <div className="TitoloAccessoPsicologo">
                <p>PSICOLOGO</p>
            </div>   

            <div>
                <img src="/logo.png" alt="logo" 
                className='logoAccessoPsicologo'
                />
            </div>
        </>

    );
}

export default AccessoPsicologo;
