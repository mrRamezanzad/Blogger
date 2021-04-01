const express                   = require('express'),
      router                    = express.Router(),
      Article                   = require('../services/article'),
      multer                    = require('multer'),
      {articlePictureUploader}  = require('../tools/uploader')

router.post('/', (req, res) => {
    const uploadArticlePicture = articlePictureUploader.single('article-picture')
    uploadArticlePicture(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            req.flash('error', "مشکلی در ذخیره سازی عکس مقاله بوجود آمده است")
            return res.status(500).redirect('/new')

        } else if (err) {
            req.flash('error', "مشکلی در ذخیره سازی عکس مقاله بوجود آمده است")
            return res.status(500).redirect('/new')
        }
        
        let inputArticle = req.body,
            newArticle 
        try {
            console.log(req);
            newArticle = await Article.create({
                title       : inputArticle.title,
                content     : inputArticle.content,
                picture     : req.file.filename, 
                author      : req.session.user._id
            })
            console.log(newArticle);
            req.flash('message', "مفاله جدید با موفقیت ذخیره شد")
            res.redirect('/new')

        } catch (err) {
            req.flash('error', "مشکلی در ساخت مقاله بوجود آمده است")
            res.status(500).redirect('/new')
        }
    })

})

module.exports = router;
