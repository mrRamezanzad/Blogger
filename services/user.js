const User      = require('../models/user'),
      bcrypt    = require('bcrypt') 

exports.create  = (userInfo, callback) => {
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
    user = await User.findById(userId)

    if (typeof callback === "function") {
        if(!user) return callback("مشکلی در پیدا کردن اطلاعات کابری بوجود آمده است.", user)
        callback(null, user)
    }
    
    return new Promise((resolve, reject) => {
        if(!user) return reject("مشکلی در پیدا کردن اطلاعات کابری بوجود آمده است.")
        resolve(user)
    })


}

exports.update = (userId, updatedUserInfo, callback) => {
    User.findOneAndUpdate({_id: userId}, {$set: updatedUserInfo}, (err, updatedUser) => {  
        if (err) return callback(err, updatedUser)
        callback(err, updatedUser)
    })
}

exports.delete = (userId, callback) => {
    User.remove({_id: userId}, (err, result) => {
        if (err) return callback(false)
        callback(true)
    })
}

exports.comparePassword = (userId, enteredPassword, callback) => {
    getUserInformation(userId, (err, user) => {
        if(err) return callback(false)
        bcrypt.compare(enteredPassword, user.password, (err, isMatch) => {
            if(err) return callback(err, isMatch)
            callback(err, isMatch)
        })
    })
}

exports.updatePassword = (userId, newPassword, callback) => {
    User.findById({_id: userId},function (err, user) {
        if (err) return callback(err, false)
        user.password = newPassword
        user.save()
        callback(err, true)
    })

}