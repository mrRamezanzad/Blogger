const express           = require('express'),
      router            = express.Router(),
      multer            = require('multer'),
      {avatarUploader}  = require('../tools/uploader'),
      User              = require('../services/user')
      
const {removeOldAvatar, updateUserInSession} = require('../tools/general')
      
// ============================ Register The User ============================
router.post('/', async (req, res) => {
    let signupPattern   = ["username", "password"],
        inputKeys       = Object.keys(req.body)  

    // Check If All The Required Data Is Passed
    let isDataValid = signupPattern.every((key) => {return inputKeys.includes(key) && req.body[key]})
    
    if(!isDataValid) {
        req.flash('error', "مقادیر ورودی را چک کنید")
        return res.status(400).redirect('register')
    }
    
    try {
        await User.create(req.body)
        req.flash('message', "اکانت شما با موفقیت ساخته شد")
        res.redirect('/login/')
        
    } catch (err) {
        req.flash('error', "مشکلی در ثبت نام شما وجود دارد")
        res.status(500).redirect('/register/')
    }
})

// ============================ Edit User ============================
router.put('/:id/', (req, res) => {
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
router.patch('/', async (req, res) => {
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

// ============================ Delete Account ============================
router.delete('/:id', async (req, res) => {
    const userId = req.params.id
    try{
        isDeleted = await User.delete(userId)
        res.clearCookie('sid')
        res.status(200).json({msg: "به امید دیدار"})  
    }
    catch (err) {return res.status(500).json({err: "در این لحظه امکان حذف اکانت وجود ندارد"})}
})

// =========================== Upload Avatar =================================
router.post('/avatar', async (req, res) => {
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

router.get('/:id/articles', async (req, res) => {
    try {
        let articles = await User.getUserArticles(req.session.user._id)
        res.render('article--list', {err: req.flash('error'), msg: req.flash('message'), articles})

    } catch (err) {
        req.flash('error', "مشکلی در یافتن مقالات کابر وجود دارد")
        res.status(500).redirect('/articles')
    }
})

module.exports = router