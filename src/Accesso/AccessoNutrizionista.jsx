import React from 'react';
import { Link } from 'react-router-dom'; 
import './accessoNutrizionista.css';


function AccessoNutrizionista() 
{
    return (
        <>
            <div className="TitoloAccessoNutrizionista">
                <p>NUTRIZIONISTA</p>
            </div>   

            <div>
                <img src="/logo.png" alt="logo" 
                className='logoAccessoNutrizionista'
                />
            </div>
        </>
    
    );
}

export default AccessoNutrizionista;
