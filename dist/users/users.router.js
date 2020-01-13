"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../common/router");
const users_model_1 = require("./users.model");
class UsersRouter extends router_1.Router {
    applyRoutes(application) {
        const user = new users_model_1.User();
        application.get('/users', (req, res, next) => {
            res.json(user.findAll());
        });
        application.get('/users/:id', (req, res, next) => {
            let id = req.params.id;
            const u = user.findById(id);
            if (u) {
                res.json(u);
                return next();
            }
            res.send(404);
        });
    }
}
exports.usersRouter = new UsersRouter();
