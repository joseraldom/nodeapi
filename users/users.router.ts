import * as restify from 'restify'
import { Router } from "../common/router";
import { User, userSchema } from './users.model';

class UsersRouter extends Router {
    applyRoutes(application: restify.Server) {
        
        application.get('/users', (req, res, next) => {
            User.find().then(users => {
                res.json(users)
                return next()
            })
        })

        application.get('/users/:id', (req, res, next) => {
            User.findById(req.params.id).then(users => {
                if (users) {
                    res.json(users)
                    return next()
                }
                res.send(404)
                return next()
            })
        })

        application.post('/users', (req, res, next) => {
            let user = new User(req.body)
            user.save().then(user => {
                user.password = undefined
                res.json(user)
                return next()
            })
        })

        application.put('/users/:id', (req, res, next) => {
            const options = {overwrite: true}
            const id = req.params.id
            User.update({_id: id}, req.body, options).exec().then(result => {
                if (result.n) {
                    return User.findById(id)
                } else {
                    return res.send(404)
                }
            }).then(user => {
                res.json(user)
                return next()
            })
        })
    }
}

export const usersRouter = new UsersRouter()