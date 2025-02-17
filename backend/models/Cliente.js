import mongoose from "mongoose";

const ClienteSchema = new mongoose.Schema({
    cf: { type: String, required: true },
    nome: { type: String, required: true },
    cognome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    telefono: { type: String, required: true },
    dataDiNascita: { type: String, required: true },
    genere: { type: String, required: true },  
    obiettivo: { type: String, required: true },
   

});

const Cliente = mongoose.model("Cliente", ClienteSchema);
export default Cliente;
