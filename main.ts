import { Server } from './server/server'
import { usersRouter } from './users/users.router'
import { peladasRouter } from './pelada/pelada.router'

const server = new Server
server.bootstrap([usersRouter, peladasRouter])