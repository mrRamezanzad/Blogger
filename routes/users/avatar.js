const router = require('express').Router()
const User   = require('../../services/user')
const {isAuthorized} = require("../../services/authorization")
const multer = require('multer')
const {avatarUploader} = require('../../tools/uploader')
const {removeOldAvatar} = require('../../tools/general')

// =========================== Upload Avatar =================================
router.post('/avatar', isAuthorized, async (req, res) => {
    const uploadAvatar = avatarUploader.single('avatar')
    uploadAvatar(req, res, function(err) {
        if (err instanceof multer.MulterError) return res.status(500).send('Server Error!')
        if (err) return res.status(500).send(err.message)

        // Change Profile Picture Of User
        try {
            let isAvatarChanged = User.changeAvatar(req.session.user._id, req.file.filename)
            if (!isAvatarChanged) {
                req.flash('error', "عکس پروفایل شما آپدیت نشد" )
                return res.redirect("/dashboard/edit")
            }

            // If User Had Another Avatar Then Remove It
            let isOldAvatarRemoved
            (async () => {
                isOldAvatarRemoved = await removeOldAvatar(req.session.user.avatar)
            })()
            
            req.session.user.avatar = req.file.filename
            req.flash('message', "عکس پروفایل شما با موفقیت تغییر کرد" )
            res.redirect("/dashboard")
            
        } catch (err) {
            req.flash('error', "خطایی در تعویض عکس پروفایل شما رخ داده است" )
            res.redirect("/dashboard/edit")
        }
    })
})  

module.exports = router