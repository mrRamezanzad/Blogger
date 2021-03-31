const express = require('express'),
      router  = express.Router()

// importing All Routes to seperate them
const view          = require("./view"),
      user          = require("./user"),
      article       = require("./article"),
      comment       = require("./comment"),
      authorization = require('./authorization')

router.use('/', [view, authorization])
router.use('/users', user)
router.use('/articles', article)
router.use('/comments', comment)

module.exports = router;
