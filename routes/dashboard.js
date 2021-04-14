const router = require('express').Router()

// ============================ Dashboard ============================
router.get('/', async (req, res) => {
  res.render('dashboard--profile')
})

// ============================ Dashboard Edit ============================
router.get('/edit', async (req, res) => {
  res.render('dashboard--edit')
})

module.exports = router