import * as restify from 'restify'
import { ModelRouter } from "../common/model-router";
import { Pelada } from "./peladas.model";

class PeladaRouter extends ModelRouter<Pelada> {
    
    constructor() {
        super(Pelada)
    }

    applyRoutes(application: restify.Server) {

        application.get('/peladas', this.findAll)
        application.get('/peladas/:id', [this.validateId, this.findById])
        application.post('/peladas', [this.save])
        application.put('/peladas/:id', [this.validateId, this.update])
        application.del('/peladas/:id', [this.validateId, this.delete])

    }
}

export const peladasRouter = new PeladaRouter()