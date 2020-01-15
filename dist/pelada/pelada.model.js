"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const peladeiroSchema = new mongoose.Schema({
    nome: {
        type: String,
        require: true
    },
    posicao: {
        type: String
    }
});
const peladaSchema = new mongoose.Schema({
    nome: {
        type: String,
        require: true
    },
    peladeiros: {
        type: [peladeiroSchema]
    }
});
exports.Pelada = mongoose.model('Pelada', peladaSchema);
