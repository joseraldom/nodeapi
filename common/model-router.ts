import { Router } from "./router";
import * as mongoose from 'mongoose'
import { NotFoundError } from "restify-errors";

export abstract class ModelRouter<D extends mongoose.Document> extends Router {
    constructor(protected model: mongoose.Model<D>) {
        super()
    }

    validateId = (req, res, next) => {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            next(new NotFoundError('Documento não encontrado.'))
        } else {
            next()
        }
    }

    findAll = (req, res, next) => {
        this.model.find().then(model => {
            res.json(model)
            return next()
        }).catch(next)
    }

    findById = (req, res, next) => {
        this.model.findById(req.params.id).then(model => {
            if (model) {
                res.json(model)
                return next()
            }
        }).catch(next)
    }

    save = (req, res, next) => {
        let document = new this.model(req.body)
        document.save().then(model => {
            res.send(201)
            return next()
        }).catch(next)
    }

    update = (req, res, next) => {
        const options = {overwrite: true}
        const id = req.params.id
        this.model.update({ _id: id }, req.body, options).exec().then(result => {
            if (result.n) {
                return this.model.findById(id)
            }
            return next()
        }).then(model => {
            res.json(model)
            return next()
        }).catch(next)
    }

    delete = (req, res, next) => {
        this.model.remove({ _id: req.params.id }).exec().then((delResult: any) => {
            if (delResult.result.n) {
                res.send(204)
            }
            return next()
        }).catch(next)
    }
}