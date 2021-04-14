exports.isLoggedIn = (req, res, next) => {
    if(req.session.user && req.cookies.sid) return next()
    res.redirect('/')
}

exports.notLoggedIn = (req, res, next) => {
    if(!req.session.user) return next()
    res.redirect('/dashboard')
}