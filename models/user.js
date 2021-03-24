const mongoose = require('mongoose'),
      bcrypt   = require('bcrypt')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String, 
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 30
    },
    lastName: {
        type: String, 
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 30
    },
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 24
    },
    password: {
        type: String,
        reuired: true,
        minlength: 5,
        maxlength: 50
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female"]
    },
    mobile: {
        type: String,
        required: true
    },
    lastUpdate: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        enum: ["admin", "blogger"],
        default: "blogger"
    }
})


// ==========================Pre Save Hook==========================
userSchema.pre("save", function (next) {
    user = this
    
    // Encrypt Password And Save It To DataBase
    bcrypt.hash(user.password, 12, (err, hash) => {
        if(err) return next(new Error("there was a problem with password"))
        user.password = hash
        next()
        
    })
})

module.exports = mongoose.model("User", userSchema)