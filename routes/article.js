const express                   = require('express'),
      router                    = express.Router(),
      Article                   = require('../services/article'),
      multer                    = require('multer')

const {articlePictureUploader}  = require('../tools/uploader')
//TODO: Seperate Images Inside Article And Upload It
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
        
        try {
            if (!req.file) {
                req.flash('error', "مقاله جدید باید حتما شامل عکس باشد")
                return res.status(400).redirect('/new')
            }
            
            let inputArticle = req.body,
                newArticle   = await Article.create({
                    title    : inputArticle.title,
                    content  : inputArticle.content,
                    picture  : req.file.filename, 
                    author   : req.session.user._id
                })

            req.flash('message', "مقاله جدید با موفقیت ذخیره شد")
            res.redirect(`/articles/${newArticle._id}`)

        } catch (err) {
            req.flash('error', "مشکلی در ساخت مقاله بوجود آمده است")
            res.status(500).redirect('/new')
        }
    })
})

router.get('/:id', async (req, res) => {
    try {
        let requestedArticleId = req.params.id,
            article = await Article.read(requestedArticleId)

        // TODO: Getting 404 Pages At End Of Project
        if(!article) return res.status(404).redirect('/')
        res.render('article', {article})

    } catch (err) {
        res.status(500).redirect('/')
    }
})

router.get('/', async (req, res) => {
    try {
        let articles = await Article.readAll({})
        res.render('article--list', {title:"لیست مقالات", articles})

    } catch (err) {
        req.flash('error', "مشکلی در پیدا کردن لیست مقالات وجود دارد")
        res.status(500).redirect('/dashboard')
    }
})

router. get('/edit/:id', async (req, res) => {
    try {
        let requestedArticleId = req.params.id,
            article = await Article.read(requestedArticleId)

        // TODO: Getting 404 Pages At End Of Project
        if(!article) return res.status(404).redirect('/')
        res.render('article--edit', {article})

    } catch (err) {
        res.status(500).redirect('/')
    }
})

router.put('/:id',articlePictureUploader.single('article-picture'), async (req, res) => {
    try {
        let articleId         = req.params.id,
            editedArticleData = {
                title       : req.body.title,
                content     : req.body.content,
                ... req.file && {picture: req.file.filename},
                lastUpdate  : Date.now()
            }

        let {ok: isEdited} = await Article.update(articleId, editedArticleData)
        res.send("ویرایش با موفقیت انجام گرفت")

    } catch (err) {
        res.status(500).send("مشکلی در ویرایش مقاله وجود دارد")
    }
})

router.delete('/:id', async (req, res) => {
    try {
        let articleId = req.params.id
        await Article.delete(articleId)
        res.send("مقاله مورد نظر با موفقیت حذف شد")

    } catch (err) {
        res.status(500).send("مشکلی در حذف مقاله مورد نظر وجود دارد")
    }
})

module.exports = router;