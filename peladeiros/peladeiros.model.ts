import * as mongoose from "mongoose";

export interface Peladeiro extends mongoose.Document {
    nome: String
    posicao: String
}

export const peladeiroSchema = new mongoose.Schema({
    nome: {
        type: String,
        require: true
    },
    posicao: {
        type: String
    }
})

export const Peladeiro = mongoose.model<Peladeiro>('Peladeiro', peladeiroSchema)