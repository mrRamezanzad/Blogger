const express = require('express'),
      router  = express.Router(),
      User    = require('../services/user')
      
// ============================ Home ============================
router.get('/', function(req, res, next) {
  res.render('index');
})

module.exports = router;
