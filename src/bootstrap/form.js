import formidable from 'formidable'
import path from 'path'

import {io} from './server'

console.log('io ----------------', io)

const form = new formidable.IncomingForm()

form.keepExtensions = true
form.encoding = 'utf-8'
form.uploadDir = path.resolve(__dirname, '../public/uploads')
form.on('progress', function (bytesReceived, bytesExpected) {
  console.log('resive', bytesReceived)
  console.log('expected', bytesExpected)
  io.to('upload_room').emit('UPLOAD_PROGRESS', {
    bytesReceived,
    bytesExpected
  })
  if (bytesReceived === 2) console.log('-------------- upload success --------------')
})

export default form
