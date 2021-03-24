const express = require('express'),
      router  = express.Router()

// Importing Services
const {logUserIn, logUserOut} = require('../services/authorization')

// ============================Logging User In============================
router.post('/login/', (req, res) => {
    let loginPattern = ["username", "password"]
    let inputKeys    = Object.keys(req.body)
    let isDataValid = loginPattern.every( input => inputKeys.includes(input) && req.body[input].trim() !== "" )
  
    if(!isDataValid) {
      req.flash('error', "لطفا فرم ورود را کامل پر کنید")
      return res.redirect('/login/')
    }
  
    logUserIn(req.body, (err, user) => { 
      if(err){
        req.flash('error', err)
        return res.redirect('/login/')
      }
      req.flash('message', `${user.username} خوش آمدی`) 
      req.session.user = user
      
      return res.redirect('/dashboard/')
    })
    
  })
  // ============================Logout User============================
  router.get('/logout/', (req, res) => {
    logUserOut(req, res)
  })

  module.exports = router