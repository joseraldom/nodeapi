"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_router_1 = require("../common/model-router");
const pelada_model_1 = require("./pelada.model");
class PeladaRouter extends model_router_1.ModelRouter {
    constructor() {
        super(pelada_model_1.Pelada);
    }
    applyRoutes(application) {
        application.get('/peladas', this.findAll);
        application.get('/peladas/:id', [this.validateId, this.findById]);
        application.post('/peladas', [this.save]);
        application.put('/peladas/:id', [this.validateId, this.update]);
        application.del('/peladas/:id', [this.validateId, this.delete]);
    }
}
exports.peladasRouter = new PeladaRouter();
