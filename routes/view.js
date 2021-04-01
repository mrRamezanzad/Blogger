const express = require('express'),
      router  = express.Router(),
      {
        isAuthorized,
        checkLogin
      }    = require('../services/authorization'),
      User = require('../services/user')

// ============================ Home ============================
router.get('/', function(req, res, next) {
  res.render('index', {msg: req.flash('message'), err: req.flash('error')});
});

// ============================ Register ============================
router.get('/register/', checkLogin, (req, res) => {
  res.render('register', {msg: req.flash('message'), err: req.flash('error')})
})

// ============================ Login ============================
router.get('/login/', checkLogin, (req, res) => {
  res.render('login', {msg: req.flash('message'), err: req.flash('error')})
})

// ============================ Dashboard ============================
router.get('/dashboard/', isAuthorized, async (req, res) => {
  res.render('dashboard--profile', {msg: req.flash('message'), err: req.flash('error')})
})

// ============================ Dashboard Edit ============================
router.get('/dashboard/edit/', isAuthorized, async (req, res) => {
  res.render('dashboard--edit', {msg: req.flash('message'), err: req.flash('error')})
})

// ============================ New Article ============================
router.get('/new', isAuthorized, (req, res) => {
  res.render('article--create', {msg: req.flash('message'), err: req.flash('error')})
})

module.exports = router;
