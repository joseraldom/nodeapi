"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("./router");
const mongoose = require("mongoose");
const restify_errors_1 = require("restify-errors");
class ModelRouter extends router_1.Router {
    constructor(model) {
        super();
        this.model = model;
        this.validateId = (req, res, next) => {
            if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
                next(new restify_errors_1.NotFoundError('Documento não encontrado.'));
            }
            else {
                next();
            }
        };
        this.findAll = (req, res, next) => {
            this.model.find().then(model => {
                res.json(model);
                return next();
            }).catch(next);
        };
        this.findById = (req, res, next) => {
            this.model.findById(req.params.id).then(model => {
                if (model) {
                    res.json(model);
                    return next();
                }
            }).catch(next);
        };
        this.save = (req, res, next) => {
            let document = new this.model(req.body);
            document.save().then(model => {
                res.send(201);
                return next();
            }).catch(next);
        };
        this.update = (req, res, next) => {
            const options = { overwrite: true };
            const id = req.params.id;
            this.model.update({ _id: id }, req.body, options).exec().then(result => {
                if (result.n) {
                    return this.model.findById(id);
                }
                return next();
            }).then(model => {
                res.json(model);
                return next();
            }).catch(next);
        };
        this.delete = (req, res, next) => {
            this.model.remove({ _id: req.params.id }).exec().then((delResult) => {
                if (delResult.result.n) {
                    res.send(204);
                }
                return next();
            }).catch(next);
        };
    }
}
exports.ModelRouter = ModelRouter;
