const router = require('express').Router()

const User = require('../services/user')
const { isAdmin } = require('../middlewares/authorization')

// ============================ Dashboard ============================
router.get('/', (req, res) => {
  res.render('dashboard/profile')
})

// ============================ Dashboard Edit ============================
router.get('/edit', (req, res) => {
  res.render('dashboard/edit')
})

// ============================ Users List ============================
router.get('/users', isAdmin, async (req, res) => {
  try {
    let users = await User.readAll()
    res.render('dashboard/users', { users })

  } catch (err) {
    req.flash('error', "مشکلی در پیدا کردن لیست کاربران وجود دارد")
    res.status(501).redirect('/dashboard')
  }
})

module.exports = router