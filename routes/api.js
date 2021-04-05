const express           = require('express'),
      router            = express.Router()

const {isAuthorized}    = require('../services/authorization')

// importing All Routes to seperate them
const index         = require("./index"),
      authorization = require('./authorization'),
      dashboard     = require("./dashboard"),
      user          = require("./user"),
      article       = require("./article"),
      comment       = require("./comment"),
      other         = require("./other")

router.use('/', [index, authorization, other])
router.use('/users', user)
router.use('/dashboard', isAuthorized, dashboard)
router.use('/articles',  isAuthorized, article)
router.use('/comments',  isAuthorized, comment)

module.exports = router;
