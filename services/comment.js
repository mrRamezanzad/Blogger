const Comment = require('../models/comment')
const Article = require('./article')

exports.create = async (articleId, ownerId, commentText) => {

   return new Promise ((resolve, reject) => {
       let comment = new Comment({
           text: commentText,
           owner: ownerId,
           article: articleId
       }).save(async (err, doc) => {
           if (err) return reject("مشلکی در ساخت کامنت بوجود آمده است.")
        
           try {
               let updatedArticle = await Article.update(doc.article, {$push: {comments: doc._id}})

                if (updatedArticle.ok) resolve(true)

            } catch (err) {reject("مشکلی در اضافه کردن نظر به مقاله وجود دارد")}
       })
   })

}

exports.delete = (commentId, articleId) => {
    return new Promise (async (resolve, reject) => {

        try {
            let isDeleted = await Comment.deleteOne({_id: commentId})
            if (isDeleted.n) {

                let isEdited = await Article.update({_id: articleId }, {$pull: {comments: commentId}})
                if (isEdited.nModified) resolve(true)
                reject("متاسفانه نظر حذف نشد.")
            }

        } catch (err) {reject("مشکلی در حذف کردن نظر بوجود آمده است.")}
    })
}