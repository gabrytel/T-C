import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import './Registrazione.css';
import TastoIndietro from './Componenti/TastoIndietro';

function Registrazione() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cf: '', nome: '', cognome: '', email: '', password: '', telefono: '',
    dataDiNascita: '', genere: '', obiettivo: ''  
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
    console.log("📩 Dati inviati al server:", formData);  // 🔍 Debug

    if (!formData.genere) {
      setMessaggio("⚠️ Seleziona un genere prima di inviare il modulo.");
      return;
    }

    try {
        const res = await axios.post('http://localhost:5000/registrazione/cliente', formData);
        setMessaggio(res.data.message);
        setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
        console.error("⚠️ Errore ricevuto dal server:", error.response?.data);
        setMessaggio(error.response?.data?.error || "Errore durante la registrazione");
    }
  };

  return (
    <div className="registrazione-container">
      <img src="/logo.png" alt="logo" className="logoRegistrazione" />
      <p className="Registrazione">Registrazione</p>
      
      <div className="form-image-container">
        <form className="DatiRegistrazione" onSubmit={handleSubmit}>
          <div className="campo">
            <label htmlFor="cf">Codice Fiscale:</label>
            <input type="text" name="cf" value={formData.cf} onChange={handleChange} required />
          </div>
          <div className="campo">
            <label htmlFor="nome">Nome:</label>
            <input type="text" name="nome" value={formData.nome} onChange={handleChange} required />
          </div>
          <div className="campo">
            <label htmlFor="cognome">Cognome:</label>
            <input type="text" name="cognome" value={formData.cognome} onChange={handleChange} required />
          </div>
          <div className="campo">
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="campo">
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          <div className="campo">
            <label htmlFor="telefono">Telefono:</label>
            <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} required />
          </div>
          <div className="campo">
            <label htmlFor="dataDiNascita">Data di nascita:</label>
            <input type="date" name="dataDiNascita" value={formData.dataDiNascita} onChange={handleChange} required />
          </div>
          <div className="campo">
            <label htmlFor="genere">Genere:</label>
            <select name="genere" value={formData.genere} onChange={handleChange} required>
              <option value="">Seleziona</option>
              <option value="Maschio">Maschio</option>
              <option value="Femmina">Femmina</option>
              <option value="Altro">Altro</option>
            </select>
          </div>
          <div className="campo">
            <label htmlFor="obiettivo">Obiettivo:</label>
            <input type="text" name="obiettivo" value={formData.obiettivo} onChange={handleChange} required />
          </div>

          <button type="submit" className="button-DatiRegistrazione">Invia</button>

          {messaggio && <p className="messaggio-registrazione">{messaggio}</p>}
        </form>
        <img src="/registrazione.png" alt="registrazione" className="imgRegistrazione" />
      </div>
      <TastoIndietro />
    </div>
  );
}

export default Registrazione;
