const router = require('express').Router()
const User   = require('../../services/user')
const {isAuthorized} = require("../../services/authorization")

router.get('/articles', isAuthorized, async (req, res) => {
    try {
        let articles = await User.getUserArticles(req.session.user._id)
        res.render('article--list', {title: "مقالات من", err: req.flash('error'), msg: req.flash('message'), articles})

    } catch (err) {
        req.flash('error', "مشکلی در یافتن مقالات کابر وجود دارد")
        res.status(500).redirect('/articles')
    }
})

module.exports = router