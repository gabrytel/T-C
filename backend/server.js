import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();
app.use(express.json());
app.use(cors());

// Connessione a MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("✅ Connesso a MongoDB"))
  .catch(err => console.error(err));

// Creazione Schema Utente
const UserSchema = new mongoose.Schema({
    nome: String,
    email: String,
    password: String
});

const User = mongoose.model("User", UserSchema);

// API per registrare un utente
app.post('/register', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json({ message: "✅ Utente registrato con successo!" });
    } catch (error) {
        res.status(500).json({ error: "Errore durante la registrazione" });
    }
});

// API per ottenere tutti gli utenti
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Errore nel recupero utenti" });
    }
});

{/*
// 📌 API per registrare uno specialista
app.post('/registrazione/specialista', async (req, res) => {
    try {
        const { nome, email, password } = req.body;
        
        // Controlliamo se l'email è già registrata
        const esiste = await Specialista.findOne({ email });
        if (esiste) return res.status(400).json({ error: "Email già registrata!" });

        // Salviamo il nuovo specialista
        const nuovoSpecialista = new Specialista({ nome, email, password });
        await nuovoSpecialista.save();

        res.status(201).json({ message: "✅ Specialista registrato con successo!" });
    } catch (error) {
        res.status(500).json({ error: "Errore nella registrazione" });
    }
});  */}

// Avviare il server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server avviato su http://localhost:${PORT}`));
