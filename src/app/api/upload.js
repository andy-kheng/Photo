import Promise from 'bluebird'
import fs from 'fs'
import gm from 'gm'
import path from 'path'
import validation from './validations/upload'

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
    const pathImage2 = path.resolve(__dirname, '../../public/uploads/scaled-' + Math.random() + path.basename(filePath))

    await gm(filePath)
      .scale(width, height, '!')
      .writeAsync(pathImage)

    var writeStream = fs.createWriteStream(pathImage2)
    gm(filePath)
      .resize('200', '200')
      .stream()
      .pipe(writeStream)


    let response = { original: filePath, scaled: pathImage }
    ctx.ok(response)
  }
}
