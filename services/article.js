const mongoose = require('mongoose'),
      Article  = require('../models/article')

const { removeOldArticleImage } = require('../helpers/general')
const { articlePictureUploader } = require('../helpers/uploader')

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
                    options: {sort: {createdAt: -1}},
                    populate: {path: 'owner', model: 'User'}
            }).exec())
            resolve(article)
            
        } catch (err) {
            reject("مشکلی در پیدا کردن مفاله وجود دارد")
        } 
    })
}

exports.count = (match) => {
    return new Promise( async (resolve, reject) => {
        try {
            resolve(await Article.countDocuments(match))
            
        } catch (err) {reject("مشکلی در شمارش تعداد مقالات وجود دارد.")}
    })
}

exports.readAll = (match, page, skip) => {
    return new Promise(async (resolve, reject) => {
        try {
            let articles = await Article.find(match).populate('author').limit(skip).skip((page-1)*skip).sort({createdAt: -1}).exec()
            resolve(articles)

        } catch (err) {
            reject("مشکلی در حین پیدا کردن مقالات بوجود آمده است")
        }
    })
}

exports.update = (articleId, editedArticleData) => {
    return new Promise(async (resolve, reject) => {
        try {
             let article = await Article.findOne({_id: articleId})
             let hasPicture = Object.keys(editedArticleData).includes('picture')
             if(hasPicture){
                removeOldArticleImage(article.picture)
            }

            let result = await article.updateOne(editedArticleData)
            resolve(result)

        } catch (err) {
            reject("مشکلی در آپدیت کردن وجود دارد")
        }
    })
}

exports.delete = (match) => {
    return new Promise(async (resolve, reject) => {
        try {
            let articles = await Article.find(match)
            articles.forEach(async (article) => {return await article.deleteOne()})

            let imageAddresses = articles.map(article => {return article.picture})
            imageAddresses.forEach( imageAddress => {removeOldArticleImage(imageAddress)})

            resolve(true)

        } catch (err) {
            reject("مشکلی در حذف مقاله بوجود آمده است")
        }
    })
}
