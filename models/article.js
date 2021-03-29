const mongoose = require('mongoose'),

// TODO: Check for neccessary fields in article 
const articleSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 100
    },
    text: {
        type: String, 
        required: true,
        trim: true,
        minlength: 100,
        maxlength: 1000
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    lastUpdate: {
        type: Date,
        default: Date.now
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refrence: 'User'
    }
})

module.exports = moongoose.model("Article", articleSchema)