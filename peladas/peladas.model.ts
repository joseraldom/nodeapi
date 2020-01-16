import * as mongoose from "mongoose";
import { Peladeiro, peladeiroSchema } from "../peladeiros/peladeiros.model"

export interface Pelada extends mongoose.Document {
    nome: String
    peladeiros: Peladeiro[]
}

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