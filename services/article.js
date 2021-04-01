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