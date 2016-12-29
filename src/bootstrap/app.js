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
import formidable from 'formidable'
// import multer from 'koa-multer'

import appConfig from '../config/app'
import db from './database'
import router from './router'

const app = new Koa()
const env = appConfig.env
const pug = new Pug({
  viewPath: './src/views',
  debug: env === 'development',
  noCache: env === 'development'
})

var form = new formidable.IncomingForm()

form.keepExtensions = true
form.encoding = 'utf-8'
form.uploadDir = path.resolve(__dirname, '../public/uploads')

// form.on('field', function (name, value) {
//   console.log(name, value) // name is user, value is test
// })
// form.on('file', function (name, file) {
//   console.log(name) // => foo
//   console.log(file) // => README.md
//   console.log(file.path) // => full filepath to where is uploaded
// })
// form.on('end', function (name, file) {
//   console.log('finish parse')
// })


app.context.db = db
app.env = env

app.use(error())
app.use(logger())
app.use(convert(serve(path.join(__dirname, '../public'))))
app.use(convert(body({
  IncomingForm: form
})))
app.use(respond())

pug.use(app)
router.use(app)

export default app
