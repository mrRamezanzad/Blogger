const multer        = require('multer'),
      path          = require('path')

const avatarStorage = multer.diskStorage({
    destination: function (req, file, next) {
        next(null, path.join(__dirname, '../public/images/avatars'))
    },
    filename: function (req, file, next) {
        next(null, `${req.session.user.username}-${Date.now()}-${file.originalname}`)
    }
})

// Make Sure File Format Is Picture
const avatarFilter = function (req, file, next) {
    if (file.mimetype === 'img/png' ||file.mimetype === 'img/jpg' ||file.mimeType === 'img/jpeg') 
        return next(null, true)
    next(new Error('تایپ فایل ارسالی معتبر نیست'))
}

exports.avatarUploader = multer ({storage: avatarStorage, filter: avatarFilter})

const articlePictureStorage = multer.diskStorage({
    destination: function (req, file, next) {
        next(null, path.join(__dirname, '../public/images/articles'))
    },
    filename: function (req, file, next) {
        next(null, `${req.body.title}-${Date.now()}-${file.originalname}`)
    }
})

const articlePictureFilter = function (req, file, next) {
    if(file.mimeType === 'img/jpg' || file.mimeType === 'img/jpeg' || file.mimeType === 'img/png')
        return next(null, true)
    next(new Error('فرمت عکس ورودی برای مقاله معتبر نیست'))
}

exports.articlePictureUploader = multer({storage: articlePictureStorage, filter: articlePictureFilter})