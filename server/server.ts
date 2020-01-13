import * as restify from 'restify'
import { environments } from '../common/evironment'
import { Router } from '../common/router'

export class Server {

    application: restify.Server

    initRoutes(routers: Router[]): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                this.application = restify.createServer()

                for (let router of routers) {
                    router.applyRoutes(this.application)
                }

                this.application.listen(environments.server.port, () => {
                    resolve(this.application)
                })
            } catch (error) {
                
            }
        })
    }

    bootstrap(routers: Router[] = []): Promise<Server> {
        return this.initRoutes(routers).then(() => this)
    }
}