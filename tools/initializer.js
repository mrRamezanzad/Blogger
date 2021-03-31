const mongoose = require("mongoose"),
      user     = require("../models/user")

async function adminInitializer (){
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
}
adminInitializer()
