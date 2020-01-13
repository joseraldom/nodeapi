"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify = require("restify");
const evironment_1 = require("../common/evironment");
class Server {
    initRoutes(routers) {
        return new Promise((resolve, reject) => {
            try {
                this.application = restify.createServer();
                for (let router of routers) {
                    router.applyRoutes(this.application);
                }
                this.application.listen(evironment_1.environments.server.port, () => {
                    resolve(this.application);
                });
            }
            catch (error) {
            }
        });
    }
    bootstrap(routers = []) {
        return this.initRoutes(routers).then(() => this);
    }
}
exports.Server = Server;
