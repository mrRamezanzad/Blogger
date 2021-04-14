const mongoose = require('mongoose'),
      Article  = require('../models/article')

exports.create = async (newArticleInfo, callback) => {
    new Article(newArticleInfo).save((err, result) => {
        if (err) return err
        return result
    } )
}

exports.read = async (articleId, callback) => {
    try {
        let article = await Article.findById({_id: articleId}).populate('author').exec()
        return article
        
    } catch (err) {
        return "مشکلی در پیدا کردن مفاله وجود دارد"
    } 
}

// FIXME: 3- MAKE PAGINATION 
exports.readAll = async (match, callback) => {
    try {
        let articles = await Article.find(match).populate('author').limit(100).skip(0).sort({createdAt: -1}).exec()
        return articles

    } catch (err) {
        return "مشکلی در حین پیدا کردن مقالات بوجود آمده است"
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
        return editedArticle

    } catch (err) {
        return "مشکلی در آپدیت کردن وجود دارد"
    }
}
exports.delete = async (articleId, callback) => {
    try {
        await Article.deleteOne({_id: articleId})
        return true

    } catch (err) {
        return "مشکلی در حذف مقاله بوجود آمده است"
    }
}