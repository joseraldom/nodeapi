"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_model_1 = require("./users.model");
const model_router_1 = require("../common/model-router");
class UsersRouter extends model_router_1.ModelRouter {
    constructor() {
        super(users_model_1.User);
    }
    applyRoutes(application) {
        application.get('/users', this.findAll);
        application.get('/users/:id', [this.validateId, this.findById]);
        application.post('/users', [this.save]);
        application.put('/users/:id', [this.validateId, this.update]);
        application.del('/users/:id', [this.validateId, this.delete]);
        //usar se necessario
        application.patch('/users/id:', (req, res, next) => {
            const options = { new: true };
            users_model_1.User.findByIdAndUpdate(req.params.id, req.body, options).then(user => {
                if (user) {
                    res.json(user);
                }
                else {
                    res.send(404);
                }
                return next();
            }).catch(next);
        });
    }
}
exports.usersRouter = new UsersRouter();
