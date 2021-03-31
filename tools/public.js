const fs        = require('fs'),
      path      = require('path')

exports.removeOldAvatar = async (filename, callback) => {
    if (typeof callback !== "function") {
        const func = this.removeOldAvatar
        return new Promise((resolve, reject) => {
           func(filename, (err, result) => {
               if (err) return reject(err)
               resolve(result)
           })
        })
    }
    
    if (filename.length) {
        try {
            let avatarExists = fs.existsSync(path.join(__dirname, "../public/images/avatars", filename))
            if (!avatarExists) return callback(null, true)
            
            fs.unlinkSync(path.join(__dirname, "../public/images/avatars", filename))
            return callback(null, true)

        } catch (err) {
            console.log(err);
            return callback("مشکلی در پاک کردن عکس پروفایل قدیمی وجود دارد", false)
        }
    }
    return callback(null, true)

}