const mongoose = require('mongoose'),
      Article  = require('../models/article')

exports.create = (newArticleInfo) => {
    return new Promise((resolve, reject) => {
        new Article(newArticleInfo).save((err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    })
}

exports.read = (articleId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let article = await (await Article.findById({_id: articleId}).populate('author')
            .populate({
                    path: 'comments', model: 'Comment',
                    populate: {path: 'owner', model: 'User'}
            }).exec())
            resolve(article)
            
        } catch (err) {
            reject("مشکلی در پیدا کردن مفاله وجود دارد")
        } 
    })
}

// FIXME: 3- MAKE PAGINATION 
exports.readAll = (match) => {
    return new Promise(async (resolve, reject) => {
        try {
            let articles = await Article.find(match).populate('author').limit(100).skip(0).sort({createdAt: -1}).exec()
            resolve(articles)

        } catch (err) {
            reject("مشکلی در حین پیدا کردن مقالات بوجود آمده است")
        }
    })
}

exports.update = (articleId, editedArticleData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let editedArticle = await Article.updateOne({_id: articleId}, editedArticleData)
            resolve(editedArticle)

        } catch (err) {
            reject("مشکلی در آپدیت کردن وجود دارد")
        }
    })
}

exports.delete = (articleId) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Article.deleteOne({_id: articleId})
            resolve(true)

        } catch (err) {
            reject("مشکلی در حذف مقاله بوجود آمده است")
        }
    })
}