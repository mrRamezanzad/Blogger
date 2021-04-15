const User = require('../models/user')

exports.create  = (userInfo) => {
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

exports.read = (match) => {
    return new Promise(async(resolve, reject) => {
        try {
            let user = await User.findOne(match)
            resolve(user)
            
        } catch (err) {reject("مشکلی در پیدا کردن اطلاعات کابری بوجود آمدهاست.")}
    })
}

exports.readAll = (match = {}) => {
    return new Promise(async(resolve, reject) => {
        try {
            let users = await User.find(match)
            resolve(users)
            
        } catch (err) {reject("مشکلی در پیدا کردن اطلاعات کابری بوجود آمدهاست.")}
    })
}

exports.update = (userId, updatedUserInfo) => {
    return new Promise(async(resolve, reject) => {
        try {
            let user = await User.findOneAndUpdate({_id: userId}, {$set: updatedUserInfo}, {new: true})
            resolve(user)

        } catch (err) {reject(err)}
    })
}

exports.delete = (userId) => {
    return new Promise(async(resolve, reject) => {
        try {
            let isDeleted = await User.remove({_id: userId})
            if(!isDeleted.n) reject("مشکلی در حذف اکانت شما وجود دارد")
            resolve(true)
            
        } catch (err) {reject(err)}
    })
}

exports.updatePassword = (userId, newPassword) => {
    return new Promise(async(resolve, reject) => {
        try {
            let user = await User.findById({_id: userId})
            user.password = newPassword
            user = await user.save()
            resolve(true)
            
        } catch (err) {reject(err)}
    })
}

exports.changeAvatar = (userId, filename) => {
    return new Promise(async(resolve, reject) => {
        try {
            let isUpdated = await this.update(userId, {avatar: filename} )
            if (!isUpdated) reject("مشکلی در اضافه کردن عکس پروفایل شما وجود دارد")
            resovle(isUpdated)
            
        } catch (err) {reject(err)}
    })
}