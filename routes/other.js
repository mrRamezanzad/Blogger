const express = require('express'),
      router  = express.Router()
      
// Importing Authorization Services
const {isAuthorized} = require('../services/authorization')

// ============================ New Article ============================
router.get('/new', isAuthorized, (req, res) => {
    res.render('article--create')
  })

module.exports = router