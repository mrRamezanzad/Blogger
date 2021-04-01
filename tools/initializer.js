const mongoose      = require('mongoose'),
      user          = require('../models/user'),
      path          = require('path'),
      fs            = require('fs')

async function initializer (){

    // Create Admin If Doesn't Exists
    let admin    
    try {
        admin = await user.findOne({role: "admin"})

    } catch (err) { return console.log(err)}
    
    if (!admin) {
        admin = new user({
            firstName       : "Shahin",
            lastName        : "Barekat", 
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

    // Get The Bug Of Empty Avatar Directory
    fs.existsSync(path.join(__dirname, "../public/images/avatars")) ||
    fs.mkdirSync(path.join(__dirname, "../public/images/avatars"))
    
    // Get The Bug Of Empty Articles Image Directory
    fs.existsSync(path.join(__dirname, "../public/images/articles")) ||
    fs.mkdirSync(path.join(__dirname, "../public/images/articles"))
    
}
initializer()
