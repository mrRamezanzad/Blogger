const mongoose = require('mongoose'),
      Article  = require('../models/article')

exports.create = async (newArticleInfo, callback) => {
    if (typeof callback !== "function") {
        const func = this.create
        return new Promise ((resolve, reject) => {
            func(newArticleInfo, (err, result) => {
                if (err) reject(err)
                resolve(result)
            })
        })
    }

    new Article(newArticleInfo).save((err, result) => {
        if (err) return callback(err, result)
        callback(null, result)
    } )
}

exports.read = async (articleId, callback) => {
    if (typeof callback !== "function") {
        const func = this.read
        return new Promise((resolve, reject) => {
            func(articleId, (err, result) => {
                if (err) reject(err)
                resolve(result)
            })
        })
    }
    
    try {
        let article = await Article.findById({_id: articleId}).populate('author').exec()
        callback(null, article)
        
    } catch (err) {
        callback("مشکلی در پیدا کردن مفاله وجود دارد", null)
    } 
}

exports.readAll = async (match, callback) => {
    if (typeof callback !== "function") {
        const func = this.readAll
        return new Promise((resolve, reject) => {
            func(match, (err, articles) => {
                if(err) reject(err)
                resolve(articles)
            })
        })
    }
    
    try {
        let articles = await Article.find(match).populate('author').sort({createdAt: -1}).exec()
        callback(null, articles)

    } catch (err) {
        callback("مشکلی در حین پیدا کردن مقالات بوجود آمده است", null)
    }
}

exports.update = async (articleId, editedArticleData, callback) => {
    if (typeof callback !== "function" ) {
        const func = this.update
        return new Promise((resolve, reject) => {
            func(articleId, editedArticleData, (err, result) => {
                if (err) reject(err)
                resolve(result)
            })
        })
    }

    try {
        let editedArticle = await Article.updateOne({_id: articleId}, editedArticleData)
        callback(null, editedArticle)

    } catch (err) {
        callback("مشکلی در آپدیت کردن وجود دارد", null)
    }
}
exports.delete = async (articleId, callback) => {
    if (typeof callback !== "function") {
        const func = this.delete
        return new Promise((resolve, reject) => {
            func(articleId, (err, result) => {
                if (err) reject(err)
                resolve(result)
            })
        })
    }

    try {
        await Article.deleteOne({_id: articleId})
        callback(null, true)

    } catch (err) {
        callback("مشکلی در حذف مقاله بوجود آمده است", null)
    }
}