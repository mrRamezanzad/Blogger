const { remove } = require('../models/user')

const express           = require('express'),
      router            = express.Router(),
      multer            = require('multer'),
      avatarUploader    = require('../tools/uploader'),
      User              = require('../services/user'),
      {removeOldAvatar} = require('../tools/public')

      
// ============================Register The User Route============================
router.post('/', async (req, res) => {
    let signupPattern = ["username", "password"]
    let inputKeys = Object.keys(req.body)  

    // Check If All The Required Data Is Passed
    let isDataValid = signupPattern.every((key) => {return inputKeys.includes(key) && req.body[key]})
    
    if(!isDataValid) {
        req.flash('error', "مقادیر ورودی را چک کنید")
        return res.status(400).redirect('register')
    }
    
    try {
        await User.create(req.body)}

    catch (err) {
        req.flash('error', "مشکلی در ثبت نام شما وجود دارد")
        return res.status(500).redirect('/register/')
    }
    
    req.flash('message', "اکانت شما با موفقیت ساخته شد")
    res.redirect('/login/')
})

// ============================Edit Account Route============================
router.put('/:id/', (req, res) => {
    // Sanitize The Updated User Information
    let updatedUserInfo = {
        username    : req.body.username,
        firstName   : req.body.firstName,
        lastName    : req.body.lastName,
        mobile      : req.body.mobile,
        gender      : req.body.gender,

    }
    try {User.update(req.params.id, updatedUserInfo)} 
    catch (err) {return res.status(500).json({err: "تغییرات نا موفق بود"})}
    res.json({msg: "اکانت شما با موفقیت آپدیت شد"})
})

// ============================ Change Password Route============================
router.patch('/', async (req, res) => {
    const userId          = req.session.user._id,
          currentPassword = req.body.currentPassword,
          newPassword     = req.body.newPassword
            
    let isMatch
    try {isMatch = await User.comparePassword(userId, currentPassword)} 
    catch (err) {return res.status(500).send("خطایی در سمت سرور رخ داده است")}
    
    if (!isMatch) return res.status(401).send("پسورد وارد شده معتبر نمی باشد")
    
    let isChanged
    try {isChanged = await User.updatePassword(userId, newPassword)}
    catch (err) {
        if(err.errors.password.kind === 'minlength') return res.status(400).send("رمز جدید باید بزرگتر از 5 حرف باشد")
        return res.status(500).send("خطایی در سمت سرور رخ داده")
    }

    if (!isChanged) return res.status(500).send("رمز شما تغییر نکرد")
    res.clearCookie("sid")
    res.send("پسورد با موفقیت تغییر کرد، لطفاً مجدداً وارد شوید")
       
})

// ============================Delete Account Route============================
router.delete('/:id', async (req, res) => {
    
    const userId = req.params.id
    try{isDeleted = await User.delete(userId)}
    catch (err) {return res.status(500).json({err: "در این لحظه امکان حذف اکانت وجود ندارد"})}

    res.clearCookie('sid')
    res.status(200).json({msg: "به امید دیدار"})  

})

// =========================== Upload Avatar =================================
router.post('/avatar', async (req, res) => {
    const upload = avatarUploader.single('avatar')
            upload(req, res, function(err) {
                if (err instanceof multer.MulterError) return res.status(404).send('Server Error!')
                if (err) return res.status(406).send(err.message)

                // Change Profile Picture Of User
                let isAvatarChanged
                try {
                    isAvatarChanged = User.changeAvatar(req.session.user._id, req.file.filename)
                    if (!isAvatarChanged) {
                        req.flash('error', "عکس پروفایل شما آپدیت نشد" )
                        return res.redirect("/dashboard/edit")
                    }

                    // If User Had Another Avatar Then Remove It
                    let isOldAvatarRemoved
                    try {
                        (async () => {
                            isOldAvatarRemoved = await removeOldAvatar(req.session.user.avatar)
                        })()

                    } catch (err) {

                        req.flash('error', "خطایی در پاک کردن عکس قبلی شما وجود دارد" )
                    }

                    req.session.user.avatar = req.file.filename
                    req.flash('message', "عکس پروفایل شما با موفقیت تغییر کرد" )
                    return res.redirect("/dashboard")
                    
                } catch (err) {
                    req.flash('error', "خطایی در تعویض عکس پروفایل شما رخ داده است" )
                    return res.redirect("/dashboard/edit")
                }
            })
})  

module.exports = router