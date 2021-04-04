const express = require('express'),
      router  = express.Router()
      
const {isAuthorized} = require('../services/authorization')

// ============================ Dashboard ============================
router.get('/', isAuthorized, async (req, res) => {
  res.render('dashboard--profile')
})

// ============================ Dashboard Edit ============================
router.get('/edit/', isAuthorized, async (req, res) => {
  res.render('dashboard--edit')
})

module.exports = router;
