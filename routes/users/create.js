const router = require('express').Router()
const User   = require('../../services/user')
const {checkLogin} = require("../../services/authorization")

// ============================ Register ============================
router.get('/register', checkLogin, (req, res) => {
    res.render('register')
  })
  
// ============================ Register The User ============================
router.post('/users', checkLogin, async (req, res) => {
    let signupPattern   = ["username", "password", "email"],
        inputKeys       = Object.keys(req.body)     

    // Check If All The Required Data Is Passed
    let isDataValid = signupPattern.every((key) => {return inputKeys.includes(key)})
    
    if(!isDataValid) {
        req.flash('error', "مقادیر ورودی را چک کنید")
        return res.status(400).redirect('register')
    }
    
    try {
        await User.create(req.body)
        req.flash('message', "اکانت شما با موفقیت ساخته شد")
        res.redirect('/login/')
        
    } catch (err) {
        req.flash('error', "مشکلی در ثبت نام شما وجود دارد")
        res.status(500).redirect('/register/')
    }
})

module.exports = router