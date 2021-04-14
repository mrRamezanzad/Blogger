const User = require('../models/user')

exports.create  = async (userInfo) => {
    new User({
        firstName   : userInfo.firstName,
        lastName    : userInfo.lastName,
        username    : userInfo.username,
        password    : userInfo.password,
        gender      : userInfo.gender,
        mobile      : userInfo.mobile,

    }).save((err, result) => {
        if (err) throw err
        return result
    })
}

exports.read = async (match) => {
    try {
        let user = await User.findOne(match)
        return user

    } catch (err) {throw "مشکلی در پیدا کردن اطلاعات کابری بوجود آمده است."}
}

exports.update = async (userId, updatedUserInfo) => {
    try {
        let user = await User.findOneAndUpdate({_id: userId}, {$set: updatedUserInfo}, {new: true})
        return user

    } catch (err) {return err}
}

exports.delete = async (userId) => {
    try {
        let isDeleted = User.deleteById(userId)
        return true

    } catch (err) {return err}
}

exports.updatePassword = async (userId, newPassword) => {
    try {
        let user = await User.findById({_id: userId})
        user.password = newPassword
        user = await user.save()
        return true

    } catch (err) {return err}
}

exports.changeAvatar = async (userId, filename) => {
    try {
        let isUpdated = await this.update(userId, { avatar: filename} )
        if (!isUpdated) throw "مشکلی در اضافه کردن عکس پروفایل شما وجود دارد"
        return isUpdated

    } catch (err) {return err}
}