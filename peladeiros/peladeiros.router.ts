import * as restify from 'restify'
import { ModelRouter } from "../common/model-router";
import { Peladeiro } from "./peladeiros.model";
import { Pelada } from '../peladas/peladas.model';
import { NotFoundError } from 'restify-errors';

class PeladeiroRouter extends ModelRouter<Peladeiro> {
    
    constructor() {
        super(Peladeiro)
    }

    save = (req, res, next) => {
        Pelada.findById(req.params.id).then(pelada => {
            if (!pelada) {
                throw new NotFoundError('Pelada não encontrada.')
            } else {
                let peladeiros = pelada.peladeiros
                peladeiros.push(req.body)
                pelada.peladeiros = peladeiros
                return pelada.save()
            }
        }).then(pelada => {
            res.send(201)
            return next()
        }).catch(next)
    }

    applyRoutes(application: restify.Server) {
        application.get('/peladas/:id/peladeiros', [this.validateId, this.findAll])
        // application.get('/pelada/:id/peladeiros', [this.validateId, this.find])
        application.post('/peladas/:id/peladeiros', [this.validateId, this.save])
        // application.put('/pelada/:id/peladeiros', [this.validateId, this.update])
        // application.del('/pelada/:id/peladeiros', [this.validateId, this.remove])
    }
}

export const peladeirosRouter = new PeladeiroRouter()