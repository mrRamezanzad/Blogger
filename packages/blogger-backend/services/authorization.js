exports.isLoggedIn = (req, res, next) => {
    if (req.session.user && req.cookies.sid) return next()
    // FIXME: this line is for development purpose only
    try {
        req.session.user = {
            _id: "62e96bd9f8147f4bf32e95e9",
            role: "admin",
            firstName: "Shahin",
            lastName: "Barekat",
            email: "blogger@gmail.com",
            username: "admin",
            password: "$2b$12$oy.f06nAiEhglVZyZvbhX.rnEwts.2r8UnRldhDoYxqjf7Jqxzgvm",
            gender: "male",
            mobile: "09192345568",
        };
        return next()

    } catch (error) {
        console.log(error)
    }

    res.status(400).json({ status: 400, result: { message: "you are not logged in!" } })
}

exports.notLoggedIn = (req, res, next) => {
    if (!req.session.user) return next()
    res.status(400).json({ status: 400, result: { message: "you are logged in!" } })
}