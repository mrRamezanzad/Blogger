const express = require('express'),
      router  = express.Router(),
      User    = require('../services/user')
      
const {isAuthorized, checkLogin} = require('../services/authorization')

// ============================ Home ============================
router.get('/', function(req, res, next) {
  res.render('index');
});

// ============================ Register ============================
router.get('/register/', checkLogin, (req, res) => {
  res.render('register')
})

// ============================ Login ============================
router.get('/login/', checkLogin, (req, res) => {
  res.render('login')
})

// ============================ Dashboard ============================
router.get('/dashboard/', isAuthorized, async (req, res) => {
  res.render('dashboard--profile')
})

// ============================ Dashboard Edit ============================
router.get('/dashboard/edit/', isAuthorized, async (req, res) => {
  res.render('dashboard--edit')
})

// ============================ New Article ============================
router.get('/new', isAuthorized, (req, res) => {
  res.render('article--create')
})

module.exports = router;
