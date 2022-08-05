const router = require("express").Router(),
    multer = require("multer");

const Article = require("../services/article");
const { articlePictureUploader } = require("../helpers/uploader");

/* --------------------------------- create --------------------------------- */
router.post("/articles", (req, res) => {
    const uploadArticlePicture = articlePictureUploader.single("article-picture");
    uploadArticlePicture(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(500).json({ status: 500, message: err.message });
        } else if (err) {
            return res.status(500).json({ status: 500, message: err.message });
        }
        try {
            // if (!req.file) {
            //     return res.status(400).json({status:400,message: "you must upload an image"})
            // }

            let inputArticle = req.body,
                newArticle = await Article.create({
                    title: inputArticle.title,
                    content: inputArticle.content,
                    // picture: req.file.filename,
                    author: req.session.user._id,
                    // FIXME: this line is for development purpose only
                });

            res.json({ status: 200, result: newArticle });
        } catch (err) {
            res.status(500).json({ status: 500, message: err.message });
        }
    });
});

/* -------------------------------- find one -------------------------------- */
router.get("/articles/:id", async (req, res) => {
    try {
        let requestedArticleId = req.params.id,
            article = await Article.read(requestedArticleId);

        let isOldViewer = article.viewers.some(
            (viewer) => String(viewer._id) === req.session.user._id
        );
        if (!isOldViewer) {
            article.viewers.push({ _id: req.session.user._id });
            article.save();
        }

        // TODO: Add Viewers Counting
        res.json({ status: 200, result: article });
    } catch (err) {
        res.status(404).json({ status: 404, message: err.message });
    }
});

/* -------------------------------- find all -------------------------------- */
router.get("/articles/pages/:pageNumber", async (req, res) => {
    try {
        let page = req.params.pageNumber ?? 1,
            skip = req.params.skip ?? 2;
        let articles = await Article.readAll({}, page, skip);
        let totalPages = Math.ceil((await Article.count()) / skip);

        res.json({
            status: 200,
            result: 
                {
                    articles,
                    totalPages,
                    currentPage: page,
                },
            
        });
    } catch (err) {
        res.status(404).json({ status: 404, message: err.message });
    }
});

/* --------------------------------- update --------------------------------- */
router.put(
    "/articles/:id",
    articlePictureUploader.single("article-picture"),
    async (req, res) => {
        try {
            let articleId = req.params.id,
                editedArticleData = {
                    title: req.body.title,
                    content: req.body.content,
                    ...(req.file && { picture: req.file.filename }),
                    lastUpdate: Date.now(),
                };

            let { ok: isEdited } = await Article.update(
                { _id: articleId },
                editedArticleData
            );
            res.json({
                status: 200,
                result: { message: "ویرایش با موفقیت انجام گرفت" },
            });
        } catch (err) {
            res.status(500).json({ status: 500, message: err.message });
        }
    }
);

/* --------------------------------- delete --------------------------------- */
router.delete("/articles/:id", async (req, res) => {
    try {
        let articleId = req.params.id;
        await Article.delete({ _id: articleId });
        res.json({
            status: 200,
            result: { message: "مقاله مورد نظر با موفقیت حذف شد" },
        });
    } catch (err) {
        res.status(500).json({ status: 500, message: err.message });
    }
});

/* ------------------------------ user articles ----------------------------- */
router.get("/articles/users/:id/:pages/:pageNumber", async (req, res) => {
    try {
        let page = req.params.pageNumber ?? 1,
            skip = req.params.skip ?? 2;
        let totalPages = Math.ceil(
            (await Article.count({ author: req.params.id })) / skip
        );
        let articles = await Article.readAll({ author: req.params.id }, page, skip);

        res.json({
            status: 200,
            result: {
                articles,
                totalPages,
                currentPage: page,
            },
        });
    } catch (err) {
        res.status(500).json({ status: 500, message: err.message });
    }
});

module.exports = router;
