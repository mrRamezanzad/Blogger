const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    text: {
        type: String, 
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 200
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    lastUpdate: {
        type: Date,
        default: Date.now
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refrence: 'User'
    },
    article: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refrence: "Article"
    }
})

module.exports = mongoose.model("Comment", commentSchema)