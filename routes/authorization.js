const router = require('express').Router()

const {logUserIn, logUserOut} = require("../services/authorization")

// ============================ Login ============================
router.get('/login', (req, res) => {
    res.render('login')
  })
  
// ============================Logging User In============================
router.post('/login', async (req, res) => {
    let loginPattern = ["username", "password"],
        inputKeys    = Object.keys(req.body),
        isDataValid  = loginPattern.every( input => inputKeys.includes(input) && req.body[input].trim() !== "" )

    if(!isDataValid) {
        req.flash('error', "لطفا فرم ورود را کامل پر کنید")
        return res.redirect('/login')
    }

    try {
        let user = await logUserIn(req.body) 
        req.flash('message', `${user.username} خوش آمدی`) 
        req.session.user = user
        return res.redirect('/dashboard')
    
    } catch (err) {
        req.flash('error', err)
        res.redirect('/login')
    }
})

// ============================Logout User============================
router.get('/logout', (req, res) => {logUserOut(req, res)} )

module.exports = router