const mongoose = require('mongoose'),
      User     = require('../models/user')
      bcrypt   = require('bcrypt')

module.exports = {
    logUserIn,
    logUserOut,
    checkLogin,
    isAuthorized
}

function logUserIn (userInfo, callback) {
    
    User.findOne({username: userInfo.username}, (err, user) => {
        if(err) return callback(err, user)
        if(!user) return callback("کاربری با این مشخصات وجود ندارد", user)
        
        bcrypt.compare(userInfo.password, user.password, (err, isMatch) => {
            
            if(err) return callback(err, user)
            if(!isMatch) return callback("لطفاً رمز ورودی خود را چک کنید", user)
            callback(err, user)

        })
    })
}

function logUserOut (req, res) {
    res.clearCookie('sid')
    res.redirect('/login/')
}

function checkLogin (req, res, next) {

    /* If Request Hass Session And Cookie Then Go To Dashboard 
       Otherwise Go To Login Or Register Pages*/
    if(req.session.user && req.cookies.sid) return res.redirect("/dashboard/")
    next()
}

function isAuthorized (req, res, next){
    
    // If Request Hass Session And Cookie Then Allow It
    if(req.session.user && req.cookies.sid) return next()
    res.redirect("/login/")
}