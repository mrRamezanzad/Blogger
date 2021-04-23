const mongoose = require('mongoose')
const Comment = require('../models/comment')
const Article = require('./article')

exports.create = async (articleId, ownerId, commentText) => {

   return new Promise ((resolve, reject) => {
       let comment = new Comment({
           text: commentText,
           owner: ownerId,
           article: articleId
       }).save(async (err, doc) => {
           if (err) reject("مشلکی در ساخت کامنت بوجود آمده است.")
        
           try {

               let updatedArticle = await Article.update(doc.article, {
                   $push: {comments: doc._id},
                   updatedAt: Date.now()
                })

                if (updatedArticle.ok) resolve(true)

            } catch (err) {reject("مشکلی در اضافه کردن نظر به مقاله وجود دارد")}
       })
       resolve(true)
   })

}