import mongoose from 'mongoose';

const ClienteSchema = new mongoose.Schema({
  cf: { type: String, required: true },
  nome: { type: String, required: true },
  cognome: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  telefono: { type: String, required: true },
  dataDiNascita: { type: Date, required: true },
  genere: { type: String, required: true },
  obiettivo: { type: String },
  
  // usati in profilo.jsx
  altezza: { type: Number },
  peso: { type: Number },
  
  // misure (sub-document)
  misure: {
    addome: { type: Number },
    fianchi: { type: Number },
    coscia: { type: Number },
    peso: { type: Number },
    altezza: { type: Number }
  },
  
  // Piani
  piani: {
    personalTrainer: { type: Object },
    nutrizionista: { type: Object },
    psicologo: { type: Object }
  },

  foto: { type: String },
  isDeleted: { type: Boolean, default: false }
});

const Cliente = mongoose.model('Cliente', ClienteSchema);
export default Cliente;
