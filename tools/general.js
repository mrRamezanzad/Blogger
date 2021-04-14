const fs        = require('fs'),
      path      = require('path')

exports.removeOldFile = async (filename, callback) => {
    return new Promise(async(resolve, reject) => {
        if (filename.length) {
            try {
                let avatarExists = fs.existsSync(path.join(__dirname, "../public/images/avatars", filename))
                if (!avatarExists) return resolve(true)
                
                fs.unlinkSync(path.join(__dirname, "../public/images/avatars", filename))
                resolve(true)
                
            } catch (err) {
              reject(false)
            }
        }
    })  

}

exports.updateUserInSession = (userInSession, updatedUserInfo) => {
    
    userInSession.firstName  = updatedUserInfo.firstName
    userInSession.lastName   = updatedUserInfo.lastName
    userInSession.username   = updatedUserInfo.username
    userInSession.mobile     = updatedUserInfo.mobile
    userInSession.gender     = updatedUserInfo.gender
    userInSession.lastUpdate = updatedUserInfo.lastUpdate
}