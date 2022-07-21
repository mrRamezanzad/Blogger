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
            $(".alert-box").append(`
                <div class="alert alert-success text-end alert-dismissible fade show" role="alert">
                    ${response}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            `)
            setTimeout(() => {location.replace(document.referrer)}, 1500)

        },
        error: function (err) {
            $(".alert-box").append(`
                <div class="alert alert-danger text-end alert-dismissible fade show" role="alert">
                    ${err.responseText}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            `)
        }
    });
})   