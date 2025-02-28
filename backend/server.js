import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { compare } from 'bcryptjs';
import Cliente from './models/Cliente.js'; 


//configurazione della app
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI, {
    // nuovo metodo per interpretare l’URL di connessione
    useNewUrlParser: true,
    //sistema per gestire la connessione al database
    useUnifiedTopology: true
  })
  .then(() => console.log("✅ Connesso a MongoDB"))
  .catch(err => console.error("❌ Errore di connessione a MongoDB:", err));


const normalizeEmail = (email) => email.trim();

/* ------------------------------------------------------------------
   Endpoint per il LOGIN
------------------------------------------------------------------ */
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email e password sono obbligatorie" });
    }

    const normalizedEmail = normalizeEmail(email);
    const cliente = await Cliente.findOne({ email: normalizedEmail });

    
    if (!cliente || cliente.isDeleted) {
      return res.status(401).json({ error: "Email o password errati" });
    }

    // Confronta la password 
    const isMatch = await compare(password, cliente.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Email o password errati" });
    }

   
    res.status(200).json({
      message: "Login effettuato con successo",
      email: normalizedEmail
    });

  } catch (error) {
    console.error("❌ Errore durante il login:", error.message);
    res.status(500).json({ error: "Errore del server" });
  }
});



/* ------------------------------------------------------------------
   Rotta di registrazione
------------------------------------------------------------------ */
app.post('/registrazione/cliente', async (req, res) => {
  try {
    let {
      cf, nome, cognome, email, password,
      telefono, dataDiNascita, genere, obiettivo
    } = req.body;

    
    if (
      !cf || !nome || !cognome || !email ||
      !password || !telefono || !dataDiNascita ||
      !genere || !obiettivo
    ) {
      return res.status(400).json({ error: "Tutti i campi sono obbligatori!" });
    }

    email = normalizeEmail(email);
    const clienteEsistente = await Cliente.findOne({ email });
    if (clienteEsistente) {
      return res.status(400).json({ error: "L'email è già registrata!" });
    }

    //HASHING della password
  
      console.log('Dati ricevuti:', req.body);
      const salt = await bcrypt.genSalt(10);
      console.log('Salt generato:', salt);
      const passwordHash = await bcrypt.hash(password, salt);
      console.log('Password criptata:', passwordHash);


    const nuovoCliente = new Cliente({
      cf,
      nome,
      cognome,
      email,
      password: passwordHash, 
      telefono,
      dataDiNascita,
      genere,
      obiettivo
    });

    await nuovoCliente.save();
    res.status(201).json({ message: "✅ Cliente registrato con successo!" });
  } catch (error) {
    console.error("❌ Errore durante la registrazione:", error.message);
    res.status(500).json({ error: "Errore del server", dettagli: error.message });
  }
});

/* ------------------------------------------------------------------
   Rotta GET Recupero di tutti i clienti
------------------------------------------------------------------ */
app.get('/clienti', async (req, res) => {
  try {
    // Trova tutti i clienti che NON hanno isDeleted === true
    const clienti = await Cliente.find({ isDeleted: false });
    res.json(clienti);
  } catch (error) {
    console.error("❌ Errore nel recupero clienti:", error.message);
    res.status(500).json({ error: "Errore del server" });
  }
});


/* ------------------------------------------------------------------
   Rotta GET  Recupero singolo cliente
------------------------------------------------------------------ */
app.get('/clienti/email/:email', async (req, res) => {
  try {
    const emailCliente = normalizeEmail(req.params.email);
    const cliente = await Cliente.findOne({ email: emailCliente });
    if (!cliente) {
      return res.status(404).json({ error: "Cliente non trovato" });
    }
    res.json(cliente);
  } catch (error) {
    console.error("❌ Errore nel recupero del cliente:", error.message);
    res.status(500).json({ error: "Errore del server" });
  }
});

/* ------------------------------------------------------------------
   Rotta GET Restituisce il piano FITNESS come OGGETTO
------------------------------------------------------------------ */
app.get('/api/pianoFitness', async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ error: "Email mancante" });
    }

    const normalizedEmail = normalizeEmail(email);
    const cliente = await Cliente.findOne({ email: normalizedEmail });
    if (!cliente) {
      return res.status(404).json({ error: "Cliente non trovato" });
    }

    const pianoFitness = cliente.piani?.personalTrainer;
    // Se l'oggetto non esiste o è vuoto
    if (!pianoFitness || Object.keys(pianoFitness).length === 0) {
      return res.status(200).json({
        message: "Nessun piano fitness trovato per questo utente.",
        workoutPlan: null
      });
    }

    // Restituisco l'oggetto
    return res.status(200).json({
      message: "Piano fitness trovato con successo!",
      workoutPlan: pianoFitness
    });
  } catch (error) {
    console.error("❌ Errore nel recupero del piano fitness:", error.message);
    return res.status(500).json({ error: "Errore del server" });
  }
});

/* ------------------------------------------------------------------
   Rotta GET Legge il piano di uno specifico esperto
------------------------------------------------------------------ */
app.get('/api/creazione-modifica', async (req, res) => {
  try {
    let { email, idEsperto } = req.query;
    if (!email || !idEsperto) {
      return res.status(400).json({ error: "Email e idEsperto sono obbligatori!" });
    }

    email = normalizeEmail(email);
    const cliente = await Cliente.findOne({ email });
    if (!cliente) {
      return res.status(404).json({ error: "Cliente non trovato" });
    }

    let piano = {};
    if (idEsperto === "111") {
      piano = cliente.piani.personalTrainer;
    } else if (idEsperto === "222") {
      piano = cliente.piani.nutrizionista;
    } else if (idEsperto === "333") {
      piano = cliente.piani.psicologo;
    } else {
      return res.status(400).json({ error: "idEsperto non valido" });
    }

    // Se piano è un oggetto vuoto
    if (!piano || (typeof piano === 'object' && Object.keys(piano).length === 0)) {
      return res.status(200).json({
        message: "Nessun piano trovato per questo esperto, creane uno nuovo.",
        workoutPlan: null
      });
    }

    // Restituisco l'oggetto
    res.json({ workoutPlan: piano });
  } catch (error) {
    console.error("❌ Errore nel recupero del piano:", error.message);
    res.status(500).json({ error: "Errore del server" });
  }
});

/* ------------------------------------------------------------------
   Rotta POST Crea o aggiorna il piano
------------------------------------------------------------------ */
app.post('/api/creazione-modifica', async (req, res) => {
  try {
    let { email, idEsperto, workoutPlan } = req.body;
    if (!email || !idEsperto || !workoutPlan) {
      return res
        .status(400)
        .json({ error: "Email, idEsperto e workoutPlan sono obbligatori!" });
    }

    email = normalizeEmail(email);
    const cliente = await Cliente.findOne({ email });
    if (!cliente) {
      return res.status(404).json({ error: "Cliente non trovato" });
    }

    // Salvataggio del piano nel database in base all'idEsperto
    if (idEsperto === "111") {
      cliente.piani.personalTrainer = workoutPlan;
    } else if (idEsperto === "222") {
      cliente.piani.nutrizionista = workoutPlan;
    } else if (idEsperto === "333") {
      cliente.piani.psicologo = workoutPlan;
    } else {
      return res.status(400).json({ error: "idEsperto non valido" });
    }

    await cliente.save();
    console.log("✅ Piano salvato in DB:", cliente.piani);

    res.status(200).json({
      message: "✅ Piano aggiornato con successo!",
      piani: cliente.piani
    });
  } catch (error) {
    console.error("❌ Errore durante la creazione/aggiornamento del piano:", error.message);
    res.status(500).json({ error: "Errore del server", dettagli: error.message });
  }
});

/* ------------------------------------------------------------------
   Esempio di rotta DELETE (soft delete)
------------------------------------------------------------------ */
app.delete('/cliente/email/:email', async (req, res) => {
  try {
    const emailCliente = normalizeEmail(req.params.email);
    const cliente = await Cliente.findOneAndUpdate(
      { email: emailCliente },
      { isDeleted: true },
      { new: true }
    );

    if (!cliente) {
      return res.status(404).json({ message: "Cliente non trovato" });
    }

    res.status(200).json({ message: "Cliente eliminato (soft delete)" });
  } catch (error) {
    console.error("❌ Errore nell'eliminazione del Cliente:", error.message);
    res.status(500).json({ message: "Errore nell'eliminazione del Cliente" });
  }
});

/* ------------------------------------------------------------------
   Endpoint GET per recuperare il profilo utente 
------------------------------------------------------------------ */
app.get('/api/profilo', async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ error: "Email mancante" });
    }

    const normalizedEmail = normalizeEmail(email);
    const cliente = await Cliente.findOne({ email: normalizedEmail });

    if (!cliente) {
      return res.status(404).json({ error: "Profilo non trovato" });
    }

    res.status(200).json({
      email: cliente.email, 
      nome: cliente.nome,
      cognome: cliente.cognome,
      genere: cliente.genere,
      eta: cliente.eta,
      altezza: cliente.altezza,
      peso: cliente.peso,
      obiettivo: cliente.obiettivo || "",
      foto: cliente.foto || null,
      misure: {
        addome:  cliente.misure?.addome  || null,
        fianchi: cliente.misure?.fianchi || null,
        coscia:  cliente.misure?.coscia  || null,
        peso:    cliente.misure?.peso    || null,
        altezza: cliente.misure?.altezza || null
      }
    });
  } catch (error) {
    console.error("❌ Errore durante il recupero del profilo:", error.message);
    res.status(500).json({ error: "Errore del server" });
  }
});

/* ------------------------------------------------------------------
   Endpoint POST per salvare i progressi dell'utente
------------------------------------------------------------------ */
app.post('/api/progressi', async (req, res) => {
  const { email, peso, addome, fianchi, coscia, altezza } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email mancante" });
  }

  try {
    const normalizedEmail = normalizeEmail(email);
    const cliente = await Cliente.findOne({ email: normalizedEmail });
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente non trovato' });
    }

    // Conversione valori in numeri
    const numPeso    = Number(peso);
    const numAddome  = Number(addome);
    const numFianchi = Number(fianchi);
    const numCoscia  = Number(coscia);
    const numAltezza = Number(altezza);

    // Salvataggio in "cliente.misure"
    cliente.misure.addome  = numAddome;
    cliente.misure.fianchi = numFianchi;
    cliente.misure.coscia  = numCoscia;
    cliente.misure.peso    = numPeso;
    cliente.misure.altezza = numAltezza;

    
    cliente.peso    = numPeso;
    cliente.altezza = numAltezza;

    await cliente.save();
    res.status(200).json({ message: 'Dati progressi salvati correttamente' });
  } catch (error) {
    console.error("❌ Errore nel salvataggio dei progressi:", error.message);
    res.status(500).json({ message: 'Errore nel salvataggio dei dati' });
  }
});

/* ------------------------------------------------------------------
   Avvio del server
------------------------------------------------------------------ */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server avviato su http://localhost:${PORT}`));
