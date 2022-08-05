const mongoose      = require('mongoose'),
      user          = require('../models/user'),
      path          = require('path'),
      fs            = require('fs')

async function initializer (){

    // Create Admin If Doesn't Exists
    try {
        let admin = await user.findOne({role: "admin"})
        if (!admin) {
            admin = new user({
                firstName       : "Shahin",
                lastName        : "Barekat", 
                email           : "blogger@gmail.com", 
                username        : "admin", 
                password        : "admin", 
                gender          : "male",
                mobile          : "09192345568",
                role            : "admin"
    
            }).save((err) => {
                if (err) return console.log("[+] There was a Problem Creating Admin ====>", err);
                console.log("[+] Created Admin Successfully");
            })
        }

    } catch (err) { return console.log(err)}
    

    // Get The Bug Of Empty Avatar Directory
    fs.existsSync(path.join(__dirname, "../public/images/avatars")) ||
    fs.mkdirSync(path.join(__dirname, "../public/images/avatars"))
    
    // Get The Bug Of Empty Articles Image Directory
    fs.existsSync(path.join(__dirname, "../public/images/articles")) ||
    fs.mkdirSync(path.join(__dirname, "../public/images/articles"))
    
}
initializer()
