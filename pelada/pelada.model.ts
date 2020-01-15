import * as mongoose from "mongoose";

export interface Peladeiro extends mongoose.Document {
    nome: String
    posicao: String
}

export interface Pelada extends mongoose.Document {
    nome: String
    peladeiros: Peladeiro[]
}

const peladeiroSchema = new mongoose.Schema({
    nome: {
        type: String,
        require: true
    },
    posicao: {
        type: String
    }
})

const peladaSchema = new mongoose.Schema({
    nome: {
        type: String,
        require: true
    },
    peladeiros: {
        type: [peladeiroSchema]
    }
})

export const Pelada = mongoose.model<Pelada>('Pelada', peladaSchema)