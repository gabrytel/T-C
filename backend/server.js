import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Cliente from './models/Cliente.js'; // Assicurati che il percorso sia corretto

dotenv.config(); // Carica le variabili d'ambiente

const app = express();
app.use(express.json());
app.use(cors());

// 📌 Connessione a MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("✅ Connesso a MongoDB"))
  .catch(err => console.error("❌ Errore di connessione a MongoDB:", err));

//  API per registrare un cliente
app.post('/registrazione/cliente', async (req, res) => {
    try {
        let { cf, nome, cognome, email, password, telefono, dataDiNascita, genere, obiettivo } = req.body;
        

        //  Controlliamo che nessun campo sia vuoto
        if (!cf || !nome || !cognome || !email || !password || !telefono || !dataDiNascita || !genere || !obiettivo) {
            return res.status(400).json({ error: "Tutti i campi sono obbligatori!" });
        }

        // controlliamo che il codice fiscale sia alfanumerico e di 16 caratteri
        const cfRegex = /^[A-Z0-9]{16}$/i;
        if (!cfRegex.test(cf)) {
            return res.status(400).json({ error: "Il codice fiscale non è valido. Deve avere 16 caratteri alfanumerici." });
        }
        //  Controlliamo il formato dell'email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "L'email non è valida." });
        }

        //   Controlliamo la lunghezza della password
        if (password.length < 6) {
            return res.status(400).json({ error: "La password deve avere almeno 6 caratteri." });
        }

        //  Controlliamo che il telefono sia numerico e lungo almeno 10 cifre
        const telefonoRegex = /^\d{10,}$/;
        if (!telefonoRegex.test(telefono)) {
            return res.status(400).json({ error: "Il numero di telefono deve avere almeno 10 cifre." });
        }

        //  Controlliamo il formato della data di nascita (YYYY-MM-DD)
        const dataRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dataRegex.test(dataDiNascita)) {
            return res.status(400).json({ error: "La data di nascita deve essere nel formato YYYY-MM-DD." });
        }

        //  Controlliamo il genere (deve essere "Maschio", "Femmina" o "Altro")
        if (!["Maschio", "Femmina", "Altro"].includes(genere)) {
            return res.status(400).json({ error: "Il genere selezionato non è valido." });
        }

        //  Controlliamo se l'email è già registrata
        const clienteEsistente = await Cliente.findOne({ email });
        if (clienteEsistente) {
            return res.status(400).json({ error: "L'email è già registrata!" });
        }

        // Se tutti i controlli sono superati, creiamo un nuovo cliente
        const nuovoCliente = new Cliente({ cf, nome, cognome, email, password, telefono, dataDiNascita, genere, obiettivo });
        await nuovoCliente.save();

        res.status(201).json({ message: "✅ Cliente registrato con successo!" });

    } catch (error) {
        console.error("❌ Errore durante la registrazione:", error);

        // Se c'è un errore di validazione Mongoose
        if (error.name === "ValidationError") {
            const dettagliErrori = Object.values(error.errors).map(err => err.message);
            console.error("⚠️ Errori di validazione:", dettagliErrori);
            return res.status(400).json({ error: "Errore di validazione", dettagli: dettagliErrori });
        }

        res.status(500).json({ error: "Errore del server", dettagli: error.message });
    }
});


// 📌 API per ottenere tutti i clienti
app.get('/clienti', async (req, res) => {
    try {
        const clienti = await Cliente.find();
        res.json(clienti);
    } catch (error) {
        console.error("❌ Errore nel recupero clienti:", error);
        res.status(500).json({ error: "Errore del server" });
    }
});

// 📌 Avviare il server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server avviato su http://localhost:${PORT}`));
