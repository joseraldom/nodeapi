import * as restify from 'restify'
import { environments } from '../common/evironment'
import { Router } from '../common/router'
import * as mongoose from 'mongoose'
import { handlerError } from './error.handler'

export class Server {

    application: restify.Server

    initRoutes(routers: Router[]): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                this.application = restify.createServer()

                this.application.use(restify.plugins.bodyParser())

                for (let router of routers) {
                    router.applyRoutes(this.application)
                }

                this.application.listen(environments.server.port, () => {
                    resolve(this.application)
                })

                this.application.on('restifyError', handlerError)
            } catch (error) {
                
            }
        })
    }

    initializeDb(): mongoose.MongooseThenable {
        (<any>mongoose).Promise = global.Promise
        return mongoose.connect(environments.db.url, {
            useMongoClient: true
        })
    }

    bootstrap(routers: Router[] = []): Promise<Server> {
        return this.initializeDb().then(() =>
            this.initRoutes(routers).then(() => this)
        ) 
    }
}