import multer from 'koa-multer'

const upload = multer({
  storage: '/public/img'
})

export default {
  upload: upload.single('file')
}
