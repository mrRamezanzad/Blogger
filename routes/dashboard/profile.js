const router = require('express').Router()

// ============================ Dashboard ============================
router.get('/', async (req, res) => {
  res.render('dashboard--profile')
})

module.exports = router