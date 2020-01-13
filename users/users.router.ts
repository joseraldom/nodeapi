import * as restify from 'restify'
import { Router } from "../common/router";
import { User } from './users.model';

class UsersRouter extends Router {
    applyRoutes(application: restify.Server) {
        const user = new User()
        
        application.get('/users', (req, res, next) => {
            res.json(user.findAll())
        })

        application.get('/users/:id', (req, res, next) => {
            let id = req.params.id
            const u = user.findById(id)
            if (u) {
                res.json(u)
                return next()
            }
            res.send(404)
        })
    }
}

export const usersRouter = new UsersRouter()