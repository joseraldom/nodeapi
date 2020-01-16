import { Server } from './server/server'
import { usersRouter } from './users/users.router'
import { peladasRouter } from './peladas/peladas.router'

const server = new Server
server.bootstrap([usersRouter, peladasRouter])