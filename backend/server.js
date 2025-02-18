// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Cliente from './models/Cliente.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// Connessione a MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("✅ Connesso a MongoDB"))
  .catch(err => console.error("❌ Errore di connessione a MongoDB:", err));

// Utility: Normalizza l'email (minuscolo e trim)
const normalizeEmail = (email) => email.toLowerCase().trim();

// ==================================================================
//               Rotte di Registrazione e Recupero Cliente
// ==================================================================

// API per registrare un cliente
app.post('/registrazione/cliente', async (req, res) => {
  try {
    let { cf, nome, cognome, email, password, telefono, dataDiNascita, genere, obiettivo } = req.body;

    // Controllo che tutti i campi siano presenti
    if (!cf || !nome || !cognome || !email || !password || !telefono || !dataDiNascita || !genere || !obiettivo) {
      return res.status(400).json({ error: "Tutti i campi sono obbligatori!" });
    }

    // Validazioni varie
    const cfRegex = /^[A-Z0-9]{16}$/i;
    if (!cfRegex.test(cf)) {
      return res.status(400).json({ error: "Il codice fiscale non è valido. Deve avere 16 caratteri alfanumerici." });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "L'email non è valida." });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: "La password deve avere almeno 6 caratteri." });
    }
    const telefonoRegex = /^\d{10,}$/;
    if (!telefonoRegex.test(telefono)) {
      return res.status(400).json({ error: "Il numero di telefono deve avere almeno 10 cifre." });
    }
    const dataRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dataRegex.test(dataDiNascita)) {
      return res.status(400).json({ error: "La data di nascita deve essere nel formato YYYY-MM-DD." });
    }
    if (!["Maschio", "Femmina", "Altro"].includes(genere)) {
      return res.status(400).json({ error: "Il genere selezionato non è valido." });
    }

    // Normalizza l'email
    email = normalizeEmail(email);

    // Controlla se il cliente esiste già
    const clienteEsistente = await Cliente.findOne({ email });
    if (clienteEsistente) {
      return res.status(400).json({ error: "L'email è già registrata!" });
    }

    // Crea un nuovo cliente; il campo "piani" verrà inizializzato con default vuoti
    const nuovoCliente = new Cliente({ cf, nome, cognome, email, password, telefono, dataDiNascita, genere, obiettivo });
    await nuovoCliente.save();

    res.status(201).json({ message: "✅ Cliente registrato con successo!" });
  } catch (error) {
    console.error("❌ Errore durante la registrazione:", error);
    if (error.name === "ValidationError") {
      const dettagliErrori = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ error: "Errore di validazione", dettagli: dettagliErrori });
    }
    res.status(500).json({ error: "Errore del server", dettagli: error.message });
  }
});

// API per ottenere la lista di tutti i clienti
app.get('/clienti', async (req, res) => {
  try {
    const clienti = await Cliente.find();
    res.json(clienti);
  } catch (error) {
    console.error("❌ Errore nel recupero clienti:", error);
    res.status(500).json({ error: "Errore del server" });
  }
});

// API per ottenere un cliente specifico per email (ricerca case-insensitive)
app.get('/clienti/email/:email', async (req, res) => {
  try {
    const emailCliente = normalizeEmail(req.params.email);
    console.log(`🔍 Ricerca cliente con email: "${emailCliente}"`);

    const cliente = await Cliente.findOne({ email: { $regex: `^${emailCliente}$`, $options: "i" } });
    if (!cliente) {
      console.log("❌ Cliente non trovato!");
      return res.status(404).json({ error: "Cliente non trovato" });
    }

    console.log("✅ Cliente trovato:", cliente);
    res.json(cliente);
  } catch (error) {
    console.error("❌ Errore nel recupero del cliente:", error);
    res.status(500).json({ error: "Errore del server" });
  }
});

// ==================================================================
//    Rotte per la gestione dei piani (separati per tipo di esperto)
// ==================================================================

// I clienti ora hanno un oggetto "piani" con 3 campi: personalTrainer, nutrizionista, psicologo

// GET /api/creazione-modifica?email=...&idEsperto=...
// Carica il piano specifico in base all'idEsperto:
//  - "111": Personal Trainer
//  - "222": Nutrizionista
//  - "333": Psicologo
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

    if (!piano || Object.keys(piano).length === 0) {
      return res.status(200).json({
        message: "Nessun piano trovato per questo esperto, creane uno nuovo.",
        workoutPlan: null
      });
    }

    res.json({ workoutPlan: piano });
  } catch (error) {
    console.error("❌ Errore nel recupero del piano:", error);
    res.status(500).json({ error: "Errore del server" });
  }
});

// POST /api/creazione-modifica
// Salva o aggiorna il piano per l'esperto specifico
app.post('/api/creazione-modifica', async (req, res) => {
  try {
    let { email, idEsperto, workoutPlan } = req.body;
    if (!email || !idEsperto || !workoutPlan) {
      return res.status(400).json({ error: "Email, idEsperto e workoutPlan sono obbligatori!" });
    }

    email = normalizeEmail(email);
    console.log("🏋️ Salvataggio workoutPlan per:", email, "Esperto:", idEsperto);
    
    const cliente = await Cliente.findOne({ email });
    if (!cliente) {
      return res.status(404).json({ error: "Cliente non trovato" });
    }

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
    console.error("❌ Errore durante la creazione/aggiornamento del piano:", error);
    res.status(500).json({ error: "Errore del server", dettagli: error.message });
  }
});

// ==================================================================
//               Altre Rotte (es. eliminazione, ecc.)
// ==================================================================

// API per eliminare un cliente specifico per email (soft delete)
// Nota: Questo codice è solo un esempio e potrebbe richiedere ulteriori modifiche.
app.delete('/cliente/:email', async (req, res) => {
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
    console.error("❌ Errore nell'eliminazione del Cliente:", error);
    res.status(500).json({ message: "Errore nell'eliminazione del Cliente" });
  }
});

// ==================================================================
//                           Avvio del Server
// ==================================================================

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server avviato su http://localhost:${PORT}`));
