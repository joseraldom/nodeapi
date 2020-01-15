"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("./router");
class ModelRouter extends router_1.Router {
    constructor(model) {
        super();
        this.model = model;
        this.findAll = (req, res, next) => {
            this.model.find().then(users => {
                res.json(users);
                return next();
            }).catch(next);
        };
    }
}
exports.ModelRouter = ModelRouter;
