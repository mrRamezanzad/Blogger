$("#edit-article").on("submit", function (e) {
    e.preventDefault()
    console.log(e);
    if (!checkArticleTitle()) return
    $("#article-content").val($(".ql-editor").html())
    if (!checkArticleContent()) return
    
    let editedArticleData = new FormData(this)

    $.ajax({
        type: "PUT",
        url: `/articles/${$("#save-edited-article").attr('data-article-id')}`,
        data: editedArticleData,
        contentType: false,
        processData: false,
        success: function (response) {
            console.log("success ===>", response);
        },
        error: function (err) {
            console.log("error ===>", err);
        }
    });
})   