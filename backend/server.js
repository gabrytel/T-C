// server.js

// 1) Import dei pacchetti necessari
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// 2) Import del modello "Cliente" da Mongoose
import Cliente from './models/Cliente.js';

// 3) Configurazione variabili d'ambiente
dotenv.config();

// 4) Creazione dell'app Express
const app = express();

// 5) Middleware per gestire JSON e CORS
app.use(express.json());
app.use(cors());

// 6) Connessione a MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("✅ Connesso a MongoDB"))
  .catch(err => console.error("❌ Errore di connessione a MongoDB:", err));

// 7) Funzione di utilità per normalizzare l'email
const normalizeEmail = (email) => email.toLowerCase().trim();


// ------------------------------------------------------------------
//          Endpoint per il login con debug
// ------------------------------------------------------------------
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('🔍 Login attempt:', { email, password });

    if (!email || !password) {
      console.log('⚠️ Email o password mancanti');
      return res.status(400).json({ error: "Email e password sono obbligatorie" });
    }

    const normalizedEmail = normalizeEmail(email);
    console.log('🔍 Email normalizzata:', normalizedEmail);

    const cliente = await Cliente.findOne({ email: normalizedEmail });
    console.log('🔍 Cliente trovato:', cliente);

    if (!cliente) {
      console.log('❌ Cliente non trovato');
      return res.status(401).json({ error: "Email o password errati" });
    }

    if (cliente.password !== password) {
      console.log('❌ Password non corrispondente:', { dbPassword: cliente.password, provided: password });
      return res.status(401).json({ error: "Email o password errati" });
    }

    console.log('✅ Login effettuato con successo per:', normalizedEmail);
    // Restituisco anche l'email affinché il client possa salvarla in localStorage
    res.status(200).json({ 
      message: "Login effettuato con successo",
      email: normalizedEmail
    });
  } catch (error) {
    console.error("❌ Errore durante il login:", error);
    res.status(500).json({ error: "Errore del server" });
  }
});


// ------------------------------------------------------------------
//      Rotte di Registrazione e Recupero Cliente
// ------------------------------------------------------------------
app.post('/registrazione/cliente', async (req, res) => {
  try {
    let {
      cf,
      nome,
      cognome,
      email,
      password,
      telefono,
      dataDiNascita,
      genere,
      obiettivo
    } = req.body;

    // 1) Validazione campi obbligatori
    if (
      !cf ||
      !nome ||
      !cognome ||
      !email ||
      !password ||
      !telefono ||
      !dataDiNascita ||
      !genere ||
      !obiettivo
    ) {
      return res.status(400).json({ error: "Tutti i campi sono obbligatori!" });
    }

    // 2) Validazione formati
    const cfRegex = /^[A-Z0-9]{16}$/i;
    if (!cfRegex.test(cf)) {
      return res
        .status(400)
        .json({
          error: "Il codice fiscale non è valido. Deve avere 16 caratteri alfanumerici."
        });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "L'email non è valida." });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "La password deve avere almeno 6 caratteri." });
    }

    const telefonoRegex = /^\d{10,}$/;
    if (!telefonoRegex.test(telefono)) {
      return res
        .status(400)
        .json({ error: "Il numero di telefono deve avere almeno 10 cifre." });
    }

    const dataRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dataRegex.test(dataDiNascita)) {
      return res
        .status(400)
        .json({ error: "La data di nascita deve essere nel formato YYYY-MM-DD." });
    }

    if (!["Maschio", "Femmina", "Altro"].includes(genere)) {
      return res.status(400).json({ error: "Il genere selezionato non è valido." });
    }

    // 3) Normalizzazione email
    email = normalizeEmail(email);

    // 4) Verifica se l'utente esiste già
    const clienteEsistente = await Cliente.findOne({ email });
    if (clienteEsistente) {
      return res.status(400).json({ error: "L'email è già registrata!" });
    }

    // 5) Creazione nuovo cliente
    const nuovoCliente = new Cliente({
      cf,
      nome,
      cognome,
      email,
      password,
      telefono,
      dataDiNascita,
      genere,
      obiettivo
      // Se desideri salvare anche 'eta', 'altezza', 'peso' ecc. direttamente qui,
      // puoi aggiungerli in base a ciò che invii dal front-end.
    });

    // 6) Salvataggio nel DB
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

app.get('/clienti', async (req, res) => {
  try {
    const clienti = await Cliente.find();
    res.json(clienti);
  } catch (error) {
    console.error("❌ Errore nel recupero clienti:", error);
    res.status(500).json({ error: "Errore del server" });
  }
});

app.get('/clienti/email/:email', async (req, res) => {
  try {
    const emailCliente = normalizeEmail(req.params.email);
    console.log(`🔍 Ricerca cliente con email: "${emailCliente}"`);

    const cliente = await Cliente.findOne({
      email: { $regex: `^${emailCliente}$`, $options: "i" }
    });

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

// ------------------------------------------------------------------
//      Rotte per la gestione dei piani (separati per tipo di esperto)
// ------------------------------------------------------------------
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

app.post('/api/creazione-modifica', async (req, res) => {
  try {
    let { email, idEsperto, workoutPlan } = req.body;

    if (!email || !idEsperto || !workoutPlan) {
      return res
        .status(400)
        .json({ error: "Email, idEsperto e workoutPlan sono obbligatori!" });
    }

    email = normalizeEmail(email);
    console.log("🏋️ Salvataggio workoutPlan per:", email, "Esperto:", idEsperto);

    const cliente = await Cliente.findOne({ email });
    if (!cliente) {
      return res.status(404).json({ error: "Cliente non trovato" });
    }

    // Salvataggio del piano in base all'idEsperto
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

// ------------------------------------------------------------------
//                Altre Rotte (es. eliminazione, ecc.)
// ------------------------------------------------------------------
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

// ------------------------------------------------------------------
//      Endpoint per recuperare il profilo utente (GET /api/profilo)
// ------------------------------------------------------------------
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

    // Invio i campi necessari per la pagina Profilo
    res.status(200).json({
      nome: cliente.nome,
      cognome: cliente.cognome,
      genere: cliente.genere,
      eta: cliente.eta,
      altezza: cliente.altezza,
      peso: cliente.peso,
      misure: {
        addome: cliente.misure?.addome || null,
        fianchi: cliente.misure?.fianchi || null,
        coscia: cliente.misure?.coscia || null
      },
      obiettivo: cliente.obiettivo || "",
      foto: cliente.foto || null
    });
  } catch (error) {
    console.error("❌ Errore durante il recupero del profilo:", error);
    res.status(500).json({ error: "Errore del server" });
  }
});

// ------------------------------------------------------------------
//                        Avvio del Server
// ------------------------------------------------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server avviato su http://localhost:${PORT}`));
