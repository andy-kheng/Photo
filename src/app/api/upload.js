import Promise from 'bluebird'
import gm from 'gm'
import path from 'path'

export default {
  create: async ctx => {
    // console.log('body', ctx.request.body)
    // console.log('fields', ctx.request.fields)
    // console.log('files', ctx.request.files)

    const filePath = ctx.request.files[0].path

    gm(filePath)
      .resize(353, 257)
      .autoOrient()
      .write(path.resolve(__dirname, '../public/uploads') + 'hello', function (err) {
        if (!err) {
          console.log(' hooray! ')
        } else {
          console.log(err)
        }
      })
    ctx.ok(filePath)
  },
  get: async ctx => {
    const { id: userId } = ctx.params
    const { user: userModel, profile: profileModel } = ctx.db.models
    const [user, profile] = await Promise.all([
      userModel.find({
        attributes: ['id', 'sid', 'username', 'password'],
        where: {
          id: userId
        },
        raw: true
      }),
      profileModel.find({
        attributes: ['first_name', 'last_name'],
        where: {
          id: userId
        },
        raw: true
      })
    ])
    const response = Object.assign(user, profile)
    ctx.ok(response)
  }
}
