import Promise from 'bluebird'
// import gm from 'gm'
import path from 'path'
// const jimp = Promise.promisifyAll(require('jimp'))
const gm = Promise.promisifyAll(require('gm'))

export default {
  async create(ctx) {
    const body = ctx.request.files
    if (!body) return ctx.bad({ message: 'Validation failed' })
    if (body == '') return ctx.bad({ message: 'Validation failed' })
    const filePath = body[0].path
    const pathImage = path.resolve(__dirname, '../../public/uploads/thumbnail-' + path.basename(filePath))
    // const image = await jimp.read(filePath)
    // image.quality(80).write(pathImage)
    gm(filePath)
      .quality(80)
      .write(pathImage, function (err) {
        if (!err) console.log('done')
      })
    let response = { original: filePath, thumbnail: pathImage }
    ctx.ok(response)
  },
  async createBig(ctx) {
    const body = ctx.request.files
    if (!body) return ctx.bad({ message: 'Validation failed' })
    if (body == '') return ctx.bad({ message: 'Validation failed' })
    const filePath = body[0].path
    const pathImage = path.resolve(__dirname, '../../public/uploads/scaled-' + path.basename(filePath))

    // const image = await gm(filePath)
    // image.quality(80).write(pathImage)

    gm(filePath)
      .scale(9933, 14043, '!')
      .write(pathImage, function (err) {
        if (!err) console.log('done')
      })
    let response = { original: filePath, scaled: pathImage }
    ctx.ok(response)
  }
}
