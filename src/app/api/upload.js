import Promise from 'bluebird'
// import fs from 'fs'
import gm from 'gm'
import path from 'path'
// import progress from 'progress-stream'
import validation from './validations/upload'
// import { io } from '../../bootstrap/server'

Promise.promisifyAll(gm.prototype)

export default {
  async create(ctx) {
    const file = ctx.request.files
    const { height, width } = ctx.request.fields
    if (!file.length) return ctx.bad({ message: 'file is required' })

    const errors = await validation.validateUpload(ctx.request.fields)
    if (errors) return ctx.bad(errors, 'Validation failed')

    const filePath = file[0].path
    const pathImage = path.resolve(__dirname, '../../public/uploads/scaled-' + path.basename(filePath))

    await gm(filePath)
      .scale(width, height, '!')
      // .quality(100)
      .writeAsync(pathImage)
    let response = { original: 'http://192.168.17.89:3000/uploads/' + path.basename(filePath), scaled: 'http://192.168.17.89:3000/uploads/' + path.basename(pathImage) }
    ctx.ok(response)

    // var stat = fs.statSync(filePath)
    // var str = progress({
    //   // length: stat.size,
    //   time: 100
    // })

    // str.on('progress', function (progress) {
    //   console.log(progress)
    //   // io.to('upload_room').emit('UPLOAD_PROGRESS', progress)
    // })

    // var writeStream = fs.createWriteStream(pathImage2)
    // let readStream = fs.createReadStream(filePath)
    // gm(readStream)
    //   .resize(width, height, '!')
    //   .stream(function (err, stdout, stderr) {
    //     if (err) {
    //       console.log('error')
    //     }
    //     stdout
    //       .pipe(str)
    //       .pipe(writeStream)
    //     let response = { original: filePath, scaled: pathImage }
    //     ctx.ok(response)
    //   })
  }
}
