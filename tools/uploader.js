const multer        = require('multer'),
      path          = require('path')

const storage = multer.diskStorage({
    destination: function(req, file, next) {
        next(null, path.join(__dirname, '../public/images/avatars'))
    },
    filename: function (req, file, next) {
        next(null, `${req.session.user.username}-${Date.now()}-${file.originalname}`)
    }
})

// Make Sure File Format Is Picture
const filter = function (req, file, next) {
    if (file.mimetype === 'img/png' ||file.mimetype === 'img/jpg' ||file.mimeType === 'img/jpeg') 
        return next(null, true)
    next(new Error('تایپ فایل ارسالی معتبر نیست'), false)
}

module.exports= multer ({storage, filter})