import { Server } from './server/server'
import { usersRouter } from './users/users.router'

const server = new Server
server.bootstrap([usersRouter])