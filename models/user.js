const mongoose = require('mongoose'),
      bcrypt   = require('bcrypt')

const userSchema = new mongoose.Schema({
    firstName: {
        type        : String, 
        required    : true,
        trim        : true,
        minlength   : 3,
        maxlength   : 30
    },
    lastName: {
        type        : String, 
        required    : true,
        trim        : true,
        minlength   : 3,
        maxlength   : 30
    },
    username: {
        type        : String,
        unique      : true,
        required    : true,
        trim        : true,
        minlength   : 3,
        maxlength   : 24
    },
    password: {
        type        : String,
        reuired     : true,
        minlength   : 4,
        maxlength   : 50
    },
    gender: {
        type        : String,
        required    : true,
        enum        : ["male", "female"]
    },
    mobile: {
        type        : String,
        required    : true
    },
    avatar: {
        type        : String,
    },
    lastUpdate: {
        type        : Date,
        default     : Date.now
    },
    role: {
        type        : String,
        enum        : ["admin", "blogger"],
        default     : "blogger"
    }
})


// ==========================Pre Save Hook==========================
userSchema.pre("save", function (next) {
    let user = this
    
    // Encrypt Password And Save It To DataBase
    bcrypt.hash(user.password, 12, (err, hash) => {
        if(err) return next(new Error("مشکلی در کدسازی پسورد وجود دارد"))
        user.password = hash
        next()
    })
})

module.exports = mongoose.model("User", userSchema)