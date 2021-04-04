const mongoose = require('mongoose'),
      User     = require('../models/user'),
      bcrypt   = require('bcrypt')

module.exports = {logUserIn, logUserOut, checkLogin, isAuthorized}

async function logUserIn (userInfo, callback) {
    if (typeof callback !== "function") {
        const func = logUserIn
        return new Promise((resolve, reject) => {
           func(userInfo, (err, result) => {
               if (err) reject(err)
               resolve(result)
           })
        })
    }
    
    try {
        let user = await User.findOne({username: userInfo.username})
        if(!user) return callback("کاربری با این مشخصات وجود ندارد", user)

        let isMatch = await bcrypt.compare(userInfo.password, user.password)
        if(!isMatch) return callback("لطفاً رمز ورودی خود را چک کنید", user)
        callback(null, user)

    } catch (err) {return callback(err, null)}
    
}

function logUserOut (req, res) {
    res.clearCookie('sid')
    res.redirect('/login')
}

function checkLogin (req, res, next) {
    /* If Request Has Session And Cookie Then Go To Dashboard 
       Otherwise Go To Login Or Register Pages*/
    if(req.session.user && req.cookies.sid) return res.redirect("/dashboard/")
    next()
}

function isAuthorized (req, res, next){
    // If Request Has Session And Cookie Then Allow It
    if(req.session.user && req.cookies.sid) return next()
    res.redirect("/login")
}