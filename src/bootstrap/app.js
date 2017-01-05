// import bodyParser from 'koa-bodyparser'
import body from 'koa-better-body'
import convert from 'koa-convert'
import error from 'koa-json-error'
import logger from 'koa-logger'
import path from 'path'
import respond from 'koa-respond'
import serve from 'koa-static'
import Koa from 'koa'
import Pug from 'koa-pug'
// import multer from 'koa-multer'

import appConfig from '../config/app'
import db from './database'
import form from './form'
import router from './router'
import response from '../response'

const app = new Koa()
const env = appConfig.env
const pug = new Pug({
  viewPath: './src/views',
  debug: env === 'development',
  noCache: env === 'development'
})

app.context.db = db
app.env = env

app.use(error())
app.use(logger())
app.use(convert(serve(path.join(__dirname, '../public'))))
app.use(convert(body({
  IncomingForm: form
})))
app.use(respond())
app.use(response())
pug.use(app)
router.use(app)

export default app
