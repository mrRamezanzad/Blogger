const router = require('express').Router()

const {isAuthorized} = require("../services/authorization")

// ============================ Dashboard ============================
router.get('/', async (req, res) => {
  res.render('dashboard--profile')
})

// ============================ Dashboard Edit ============================
router.get('/edit', async (req, res) => {
  res.render('dashboard--edit')
})

module.exports = router