const User     = require('../services/user'),
      bcrypt   = require('bcrypt')
    
exports.logUserIn = async  (userInfo) => {  
    try {
        let user = await User.read({username: userInfo.username})
        if(!user) throw "کاربری با این مشخصات وجود ندارد"

        let isMatch = await comparePassword(userInfo.password, user.password)
        if(!isMatch) throw "لطفاً رمز ورودی خود را چک کنید"
        return user

    } catch (err) {throw err}
}

exports.logUserOut = (req, res) =>  {
    res.clearCookie('sid')
    res.redirect('/login')
}

async function comparePassword (enteredPassword, password) {
    try {return await bcrypt.compare(enteredPassword, password)}
    catch (err) {throw err}
}
