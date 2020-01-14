"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify = require("restify");
const evironment_1 = require("../common/evironment");
const mongoose = require("mongoose");
class Server {
    initRoutes(routers) {
        return new Promise((resolve, reject) => {
            try {
                this.application = restify.createServer();
                this.application.use(restify.plugins.bodyParser());
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
    initializeDb() {
        mongoose.Promise = global.Promise;
        return mongoose.connect(evironment_1.environments.db.url, {
            useMongoClient: true
        });
    }
    bootstrap(routers = []) {
        return this.initializeDb().then(() => this.initRoutes(routers).then(() => this));
    }
}
exports.Server = Server;
