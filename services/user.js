const User      = require('../models/user'),
      Article   = require('../services/article'),
      bcrypt    = require('bcrypt') 

exports.create  = async (userInfo, callback) => {
    if (typeof callback !== "function") {
        const func = this.create
        return new Promise((resolve, reject) => {
           func(userInfo, (err, result) => {
               if (err) reject(err)
               resolve(result)
           })
        })
    }

    new User({
        firstName   : userInfo.firstName,
        lastName    : userInfo.lastName,
        username    : userInfo.username,
        password    : userInfo.password,
        gender      : userInfo.gender,
        mobile      : userInfo.mobile,

    }).save(callback)
    
}

exports.read = async (userId, callback = "") => {
    if (typeof callback !== "function") {
        const func = this.read
        return new Promise((resolve, reject) => {
            func (userId, (err, result) => {
                if (err) reject(err)
                resolve(result)
            })
        })
    }

    try {
        let user = await User.findById(userId)
        callback(null, user)

    } catch (err) { callback("مشکلی در پیدا کردن اطلاعات کابری بوجود آمده است.", null)}
}

exports.update = async (userId, updatedUserInfo, callback) => {
    if (typeof callback !== "function") {
        const func = this.update
        return new Promise((resolve, reject) => {
           func(userId, updatedUserInfo, (err, result) => {
               if (err) reject(err)
               resolve(result)
           })
        })
    }

    try {
        let user = await User.findOneAndUpdate({_id: userId}, {$set: updatedUserInfo}, {new: true})
        callback(null, user)

    } catch (err) { callback(err, null)}
}

exports.delete = async (userId, callback) => {
    if (typeof callback !== "function") {
        const func = this.delete
        return new Promise((resolve, reject) => {
           func(userId, (err, result) => {
               if (err) reject(err)
               resolve(result)
           })
        })
    }

    try {
        User.remove({_id: userId})
        callback(null, true)

    } catch (err) {return callback(err, false)}
}

exports.comparePassword = async (userId, enteredPassword, callback) => {
    if (typeof callback !== "function") {
        const func = this.comparePassword
        return new Promise((resolve, reject) => {
           func(userId, enteredPassword, (err, result) => {
               if (err) reject(err)
               resolve(result)
           })
        })
    }

    try {
        let user    = await this.read(userId),
            isMatch = await bcrypt.compare(enteredPassword, user.password)
        callback(null, isMatch)

    } catch (err) {return callback(err, false)}

}

exports.updatePassword = async (userId, newPassword, callback) => {
    if (typeof callback !== "function") {
        const func = this.updatePassword
        return new Promise((resolve, reject) => {
           func(userId, newPassword, (err, result) => {
               if (err) reject(err)
               resolve(result)
           })
        })
    }

    try {
        let user = await User.findById({_id: userId})
        user.password = newPassword
        user = await user.save()
        callback(null, true)

    } catch (err) {return callback(err, false)}

}

exports.changeAvatar = async (userId, filename, callback) => {
    if (typeof callback !== "function") {
        const func = this.changeAvatar
        return new Promise((resolve, reject) => {
           func(userId, filename, (err, result) => {
               if (err) reject(err)
               resolve(result)
           })
        })
    }

    try {
        let isUpdated = await this.update(userId, { avatar: filename} )
        if (!isUpdated) return callback("مشکلی در اضافه کردن عکس پروفایل شما وجود دارد", isUpdated)
        callback(null, isUpdated)

    } catch (err) {
        if (err) return callback("مشکلی در اضافه کردن عکس پروفایل شما وجود دارد", false)
    }
}

exports.getUserArticles = async (userId, callback) => {
    if (typeof callback !== "function") {
        const func = this.getUserArticles
        return new Promise((resolve, reject) => {
            func(userId, (err, result) => {
                if (err) reject(err)
                resolve(result)
            })
        })
    }

    try {
        let articles = await Article.readAll({author: userId})
        callback(null, articles)

    } catch (err) {
        callback("مشکلی در یافتن مقالات این کاربر وجود دارد", null)
    }
}