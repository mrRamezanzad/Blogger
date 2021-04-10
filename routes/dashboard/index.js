const router = require('express').Router()
const {isAuthorized} = require("../../services/authorization")

router.use('/dashboard', isAuthorized, [require('./edit'), require('./profile')])

module.exports = router