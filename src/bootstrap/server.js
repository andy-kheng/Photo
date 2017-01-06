import chalk from 'chalk'
import co from 'co'
import http from 'http'
import SocketIo from 'socket.io'

import app from './app'
import appConfig from '../config/app'
import db from './database'
import websocket from './websocket'


const red = chalk.bold.red
const cyan = chalk.bold.cyan
const log = console.log
const port = appConfig.port
const server = http.createServer(app.callback())

export const io = new SocketIo(server)

websocket.use(io)

co(function* () {
  const sync = yield db.sync({
    force: true,
    logging: console.log
  })
  if (sync) {
    server.listen(port, () => console.log(`Server running on port ${port}`))
  }
}).catch(e => {
  log(`${cyan('[Database Error]:')} ${red('Unable to connect with the database.', e.message)}`)
})

export default server
