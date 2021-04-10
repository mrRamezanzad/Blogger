const { isAuthorized } = require('../../services/authorization')

const router = require('express').Router()

router.use('/', require('./create'))
router.use('/users', isAuthorized, require('./update'))
router.use('/users', isAuthorized, require('./delete'))
router.use('/users', isAuthorized, require('./avatar'))
router.use('/users', isAuthorized, require('./articles'))

module.exports = router