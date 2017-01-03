export default () => {
  return async (ctx, next) => {
    ctx.ok = function (data, message) {
      ctx.status = 200
      ctx.body = data = data || { message: 'Success' }
      ctx.set('Message', message || data.message || 'Success')
    }
    ctx.bad = function (data, message) {
      ctx.status = 400
      ctx.body = data = data || { message: 'Bad request' }
      ctx.set('Message', message || data.message || 'Bad request')
    }
    ctx.notFound = function (data, message) {
      ctx.status = 404
      ctx.body = data = data || { message: 'Not found' }
      ctx.set('Message', message || data.message || 'Not found')
    }
    ctx.denyAccess = function (data, message) {
      ctx.status = 403
      ctx.body = data = data || { message: 'Access denied' }
      ctx.set('Message', message || data.message || 'Access denied')
    }
    ctx.error = function (data, message) {
      ctx.status = 500
      ctx.body = data = data || { message: 'Server error' }
      ctx.set('Message', message || data.message || 'Server error')
    }
    await next()
  }
}
