const router = require('express').Router()
const User   = require('../../services/user')
const {isAuthorized} = require("../../services/authorization")
const {updateUserInSession} = require('../../tools/general')

// ============================ Edit User ============================
router.put('/:id/', isAuthorized, (req, res) => {
    // Sanitize The Updated User Information
    let updatedUserInfo = {
        username    : req.body.username,
        firstName   : req.body.firstName,
        lastName    : req.body.lastName,
        mobile      : req.body.mobile,
        gender      : req.body.gender,
        lastUpdate  : Date.now()

    }
    try {
        User.update(req.params.id, updatedUserInfo)
        updateUserInSession(req.session.user, updatedUserInfo)
        res.json({msg: "اکانت شما با موفقیت آپدیت شد"})

    } catch (err) {return res.status(500).json({err: "تغییرات نا موفق بود"})}
})

// ============================ Change Password ============================
router.patch('/', isAuthorized, async (req, res) => {
    const userId          = req.session.user._id,
          currentPassword = req.body.currentPassword,
          newPassword     = req.body.newPassword
            
    try {
        let isMatch = await User.comparePassword(userId, currentPassword)
        if (!isMatch) return res.status(401).send("پسورد وارد شده معتبر نمی باشد")

        let isChanged = await User.updatePassword(userId, newPassword)
        if (!isChanged) return res.status(500).send("رمز شما تغییر نکرد")

        res.clearCookie("sid")
        res.send("پسورد با موفقیت تغییر کرد، لطفاً مجدداً وارد شوید")
    } 
    catch (err) {
        if(err.errors.password.kind === 'minlength') return res.status(400).send("رمز جدید باید بزرگتر از 5 حرف باشد")
        return res.status(500).send("خطایی در سمت سرور رخ داده است")
    }
})

module.exports = router