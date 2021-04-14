const User = require('../models/user')

exports.create  = async (userInfo) => {
    return new Promise((resolve, reject) => {
        new User({
            firstName : userInfo.firstName,
                lastName  : userInfo.lastName,
                username  : userInfo.username,
                password  : userInfo.password,
                gender    : userInfo.gender,
                mobile    : userInfo.mobile,
                
            }).save((err, result) => {
                if (err) reject(err)
                resolve(result)
            })
    })
}

exports.read = async (match) => {
    try {
        let user = await User.findOne(match)
        return user

    } catch (err) {throw "مشکلی در پیدا کردن اطلاعات کابری بوجود آمدهاست."}
}

exports.update = async (userId, updatedUserInfo) => {
    try {
        let user = await User.findOneAndUpdate({_id: userId}, {$set: updatedUserInfo}, {new: true})
        return user

    } catch (err) {throw err}
}

exports.delete = async (userId) => {
    try {
        let isDeleted = await User.remove({_id: userId})
        if(!isDeleted.n) throw "مشکلی در حذف اکانت شما وجود دارد"
        return true

    } catch (err) {throw err}
}

exports.updatePassword = async (userId, newPassword) => {
    try {
        let user = await User.findById({_id: userId})
        user.password = newPassword
        user = await user.save()
        return true

    } catch (err) {throw err}
}

exports.changeAvatar = async (userId, filename) => {
    try {
        let isUpdated = await this.update(userId, {avatar: filename} )
        if (!isUpdated) throw "مشکلی در اضافه کردن عکس پروفایل شما وجود دارد"
        return isUpdated

    } catch (err) {throw err}
}