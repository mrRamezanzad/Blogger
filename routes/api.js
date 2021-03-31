const express           = require('express'),
      router            = express.Router(),
      {isAuthorized}    = require('../services/authorization')

// importing All Routes to seperate them
const view          = require("./view"),
      user          = require("./user"),
      article       = require("./article"),
      comment       = require("./comment"),
      authorization = require('./authorization')

router.use('/', [view, authorization])
router.use('/users', isAuthorized, user)
router.use('/articles', isAuthorized, article)
router.use('/comments', isAuthorized, comment)

module.exports = router;
