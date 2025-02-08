import mongoose from 'mongoose';

const EspertoSchema = new mongoose.Schema({
    
    id: { type: String, required: true, unique: true },
    
});

const Esperto = mongoose.model("Esperto", EspertoSchema);
module.exports = Esperto; 