const router = require('express').Router()
const Comment = require('../services/comment')

router.post('/:articleId', async (req, res) => {
    try {
        let articleId = req.params.articleId
        let commentText = req.body.comment
        let ownerId = req.session.user._id

        let isCreated = await Comment.create(articleId, ownerId, commentText)
        req.flash('message', 'نظر شما با موفقیت ثبت شد.')
        res.status(201).redirect('back')

    } catch (err) {
        req.flash('error', err)
        res.status(500).redirect('back')
    }
})

module.exports = router