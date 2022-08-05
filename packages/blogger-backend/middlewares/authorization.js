exports.isAdmin = (req, res, next) => {
    if(req.session.user.role !== "admin"){
        req.flash('error', "403 شما دسترسی مورد نیاز را ندارید")
        return res.status(403).redirect('/dashboard')
    }
    next()
}