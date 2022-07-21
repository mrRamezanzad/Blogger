const mongoose = require('mongoose')

module.exports = function (address, databaseName) {
  
    mongoose.connect(`mongodb://mongo/${databaseName}`,{
        useNewUrlParser     : true,
        useUnifiedTopology  : true,
        
        }, (err) => {
            if (err) return console.log(err)
            console.log(`[+] Successfully Connected To mongodb://${address}/${databaseName}`)
    })
}
