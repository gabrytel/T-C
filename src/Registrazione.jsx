import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import './Registrazione.css';
import TastoIndietro from './Componenti/TastoIndietro';


function Registrazione() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cf: '',
    nome: '',
    cognome: '',
    email: '',
    password: '',
    telefono: '',
    indirizzo: '',
    citta: '',
    cap: '',
    provincia: '',
    dataDiNascita: '',
    sesso: '',
    altezza: '',
    peso: '',
    obiettivo: '',
  });
  const [messaggio, setMessaggio] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/registrazione/cliente', formData);
      setMessaggio(res.data.message);
      setTimeout(() => navigate('/login'), 2000); // Reindirizza dopo 2 secondi
    } catch (error) {
      setMessaggio(error.response?.data?.error || "Errore durante la registrazione");
    }
  };

  
  return (
    <>
    <div>
    <img src= "/logo.png" alt="logo"
    className='logoRegistrazione'/>
    </div>

    <p className="Registrazione">Registrazione</p>

    <div class="container">

    <div className="DatiRegistrazione">

            <div className="campo">
              <label htmlFor="codiceFiscale" className="CF">Inserisci codice fiscale:</label>
              <input 
                type="text" 
                name="cf"
                value={formData.cf}
                onChange={(handleChange)} required
                id="codiceFiscale" 
                className="input-DatiRegistrazione" 
                aria-label="codice fiscale" 
              />
            </div>

            <div className="campo">
              <label htmlFor="nome" className="NomeUtente">Inserisci nome:</label>
              <input 
                type="text" 
                name='nome'
                value={formData.nome}
                onChange={(handleChange)} required
                id="nome" 
                className="input-DatiRegistrazione" 
                aria-label="nome" 
              />
            </div>

            <div className="campo">
              <label htmlFor="cognome" className="CognomeUtente">Inserisci cognome:</label>
              <input 
                type="text" 
                name="cognome"
                value={formData.cognome}
                onChange={(handleChange)} required
                id="cognome" 
                className="input-DatiRegistrazione" 
                aria-label="cognome" 
              />
            </div>

            <div className="campo">
              <label htmlFor="mail" className="MailUtente">Inserisci email:</label>
              <input 
                type="text"
                name="email"
                value={formData.email}
                onChange={(handleChange)} required 
                id="mail" 
                className="input-DatiRegistrazione" 
                aria-label="mail" 
              />
            
            </div>

            <div className="campo">
              <label htmlFor="passwordUtente" className="PasswordUtente">Inserisci password:</label>
              <input 
                type="text" 
                name="password"
                value={formData.password}
                onChange={(handleChange)} required
                id="passwordUtente" 
                className="input-DatiRegistrazione" 
                aria-label="passwordUtente" 
              />
              
            </div>

          <div className="campo">
              <label htmlFor="telefono" className="TelefonoUtente">Inserisci telefono:</label>  
              <input 
                type="text" 
                name="telefono"
                value={formData.telefono}
                onChange={(handleChange)} required
                id="telefono" 
                className="input-DatiRegistrazione" 
                aria-label="telefono" 
              />
          </div>
            <div className="campo">
              <label htmlFor="indirizzo" className="IndirizzoUtente">Inserisci indirizzo:</label>
              <input 
                type="text" 
                name="indirizzo"
                value={formData.indirizzo}
                onChange={(handleChange)} required
                id="indirizzo" 
                className="input-DatiRegistrazione" 
                aria-label="indirizzo" 
              />
            </div>


              <div className="campo">
                <label htmlFor="citta" className="CittaUtente">Inserisci città:</label>
                <input 
                  type="text" 
                  name="citta"
                  value={formData.citta}
                  onChange={(handleChange)} required
                  id="citta" 
                  className="input-DatiRegistrazione" 
                  aria-label="citta"
                />
                </div>

            <div className="campo">
              <label htmlFor="cap" className="CapUtente">Inserisci CAP:</label>
              <input 
                type="text" 
                name="cap"
                value={formData.cap}
                onChange={(handleChange)} required
                id="cap" 
                className="input-DatiRegistrazione" 
                aria-label="cap"
              />
              </div>

              <div className="campo">
                <label htmlFor="provincia" className="ProvinciaUtente">Inserisci provincia:</label>
                <input 
                  type="text" 
                  name="provincia"
                  value={formData.provincia}
                  onChange={(handleChange)} required
                  id="provincia" 
                  className="input-DatiRegistrazione" 
                  aria-label="provincia"
                />
                </div>

                <div className="campo">
                  <label htmlFor="dataDiNascita" className="DataDiNascitaUtente">Inserisci data di nascita:</label>
                  <input 
                    type="text" 
                    name="dataDiNascita"
                    value={formData.dataDiNascita}
                    onChange={(handleChange)} required
                    id="dataDiNascita" 
                    className="input-DatiRegistrazione" 
                    aria-label="dataDiNascita"
                  />
                  </div>

                <div className="campo">
                  <label htmlFor="sesso" className="SessoUtente">Inserisci sesso:</label>
                  <input 
                    type="text" 
                    name="sesso"
                    value={formData.sesso}
                    onChange={(handleChange)} required
                    id="sesso" 
                    className="input-DatiRegistrazione" 
                    aria-label="sesso"
                  />
                  </div>

                  <div className="campo">
                    <label htmlFor="altezza" className="AltezzaUtente">Inserisci altezza:</label>
                    <input 
                      type="text" 
                      name="altezza"
                      value={formData.altezza}
                      onChange={(handleChange)} required
                      id="altezza" 
                      className="input-DatiRegistrazione" 
                      aria-label="altezza"
                    />
                    </div>

                    <div className="campo">
                      <label htmlFor="peso" className="PesoUtente">Inserisci peso:</label>
                      <input 
                        type="text" 
                        name="peso"
                        value={formData.peso}
                        onChange={(handleChange)} required
                        id="peso" 
                        className="input-DatiRegistrazione" 
                        aria-label="peso"
                      />
                      </div>

                      <div className="campo">
                        <label htmlFor="obiettivo" className="ObiettivoUtente">Inserisci obiettivo:</label>
                        <input 
                          type="text" 
                          name="obiettivo"
                          value={formData.obiettivo}
                          onChange={(handleChange)} required
                          id="obiettivo"
                          className="input-DatiRegistrazione"
                          aria-label="obiettivo"
                        />
                        </div>

  
    </div>
    <img src= "/registrazione.png" alt="registrazione"
    className='imgRegistrazione'/>
    <div className="BottoneDatiRegistrazione">
      <button type="submit" className="button-DatiRegistrazione" onClick={handleSubmit}>Invia</button>
    </div>
    <TastoIndietro />
    </div>
    </>
  );
}
