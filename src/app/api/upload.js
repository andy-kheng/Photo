import Promise from 'bluebird'
// import gm from 'gm'
import path from 'path'
const jimp = Promise.promisifyAll(require('jimp'))


export default {
  async create(ctx) {
    const body = ctx.request.files
    if (!body) return ctx.bad({ message: 'Validation failed' })
    if (body == '') return ctx.bad({ message: 'Validation failed' })
    const filePath = body[0].path
    const pathImage = path.resolve(__dirname, '../../public/uploads/thumbnail-' + path.basename(filePath))
    const image = await jimp.read(filePath)
    image.quality(60).write(pathImage)
    let response = { original: filePath, thumbnail: pathImage }
    ctx.ok(response)
  },
  async createBig(ctx) {
    const body = ctx.request.files
    if (!body) return ctx.bad({ message: 'Validation failed' })
    if (body == '') return ctx.bad({ message: 'Validation failed' })
    const filePath = body[0].path
    const pathImage = path.resolve(__dirname, '../../public/uploads/scaled-' + path.basename(filePath))
    const image = await jimp.read(filePath)
    image.resize(3178.582677165, 4493.858267717).write(pathImage)
    let response = { original: filePath, scaled: pathImage }
    ctx.ok(response)
  }
}
