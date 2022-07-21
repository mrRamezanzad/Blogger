const router = require('express').Router()

router.get('/404', (req, res) => {res.render('404')})

router.get('/500', (req, res) => {res.render('500')})

module.exports = router