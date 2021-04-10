const router = require('express').Router()

// ============================ Dashboard Edit ============================
router.get('/edit/', async (req, res) => {
  res.render('dashboard--edit')
})

module.exports = router