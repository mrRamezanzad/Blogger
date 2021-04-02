const mongoose = require('mongoose'),
      Article  = require('../models/article')

exports.create = async (newArticleInfo, callback) => {
    if (typeof callback !== "function") {
        const func = this.create
        return new Promise ((resolve, reject) => {
            func(newArticleInfo, (err, doc) => {
                if (err) return reject(err)
                resolve(doc)
            })
        })
    }

    new Article(newArticleInfo).save((err, doc) => {
        if (err) return callback(err, doc)
        return callback(null, doc)
    } )
}

exports.read = async (articleId, callback) => {
    if (typeof callback !== "function") {
        func = this.read
        return new Promise((resolve, reject) => {
            func(articleId, (err, doc) => {
                if (err) reject(err)
                resolve(doc)
            })
        })
    }
    
    let article 
    try {
        article = await Article.findById({_id: articleId})
        callback(null, article)

    } catch (err) {
        console.log(err);
        callback("مشکلی در پیدا کردن مفاله وجود دارد", article)
    } 
}