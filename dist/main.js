"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server/server");
const users_router_1 = require("./users/users.router");
const pelada_router_1 = require("./pelada/pelada.router");
const server = new server_1.Server;
server.bootstrap([users_router_1.usersRouter, pelada_router_1.peladasRouter]);
