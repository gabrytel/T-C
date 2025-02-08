import mongoose from "mongoose"

const ClienteSchema = new mongoose.Schema({
    cf: { type: String, required: true },
    nome: { type: String, required: true },
    cognome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    telefono: { type: String, required: true },
    indirizzo: { type: String, required: true },
    citta: { type: String, required: true },
    cap: { type: String, required: true },
    provincia: { type: String, required: true },
    dataDiNascita: { type: String, required: true },
    sesso: { type: String, required: true },
    altezza: { type: String, required: true },
    peso: { type: String, required: true },
    obiettivo: { type: String, required: true },

});

const Cliente = mongoose.model("Cliente", ClienteSchema);
export default Cliente;

