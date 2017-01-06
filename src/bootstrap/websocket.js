import redis from 'socket.io-redis'
import SocketIo from 'socket.io'

import redisConfig from '../config/redis'
import form from './form'

const { host, port } = redisConfig

export default {
  use(io) {
    // io.adapter(redis({ host, port })) // comment this line if you don't want to use redis
    io.on('connection', socket => {
      socket.join('upload_room')
      console.log(`socket ${socket.id} connected`)
      socket.on('disconnect', () => {
        console.log(`socket ${socket.id} disconnected`)
      })
    })
  }
}
