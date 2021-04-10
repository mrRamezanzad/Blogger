const router = require('express').Router()

router.use('/login', require('./login'))
router.use('/logout', require('./logout'))

module.exports = router