import * as restify from 'restify'
import { Router } from "../common/router";
import { User } from './users.model';
import { NotFoundError } from 'restify-errors';
import { ModelRouter } from '../common/model-router';

class UsersRouter extends ModelRouter<User> {
    
    constructor() {
        super(User)
    }
    
    applyRoutes(application: restify.Server) {
        
        application.get('/users', this.findAll)
        application.get('/users/:id', [this.validateId, this.findById])
        application.post('/users', [this.save])
        application.put('/users/:id', [this.validateId, this.update])
        application.del('/users/:id', [this.validateId, this.delete])

        //usar se necessario
        application.patch('/users/id:', (req, res, next) => {
            const options = { new: true }
            User.findByIdAndUpdate(req.params.id, req.body, options).then(user => {
                if(user) {
                    res.json(user)
                } else {
                    res.send(404)
                }
                return next()
            }).catch(next)
        })

    }
}

export const usersRouter = new UsersRouter()