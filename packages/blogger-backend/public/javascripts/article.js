// Text Editor Setup
var quill = new Quill('#editor', {
    theme: 'snow',
    modules: {
      toolbar: [
        ['bold', 'italic'],
        ['link', 'blockquote', 'code-block', 'image'],
        [{ list: 'ordered' }, { list: 'bullet' }]
      ]
    }  
  });

// Sendig Article Save Request
$("#new-article").on("submit", function (e) {
  e.preventDefault()
  
  if(!checkArticleTitle()) return 
  $("#article-content").val($(".ql-editor").not('.ql-blank').html())
  if(!checkArticleContent()) return 

  this.submit()

})

// Check If Article Title Is Empty
function checkArticleTitle () {
  let title = $("#article-title").val()
  if (title.trim().length) return true

  $(".alert-box").append(`
      <div class="alert alert-danger text-end alert-dismissible fade show" role="alert">
          تیتر مقاله نمی تواند خالی باشد
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`
    )
  return false
}

// Check If Article Content Is Empty
function checkArticleContent () {
  let isBlank = $(".ql-editor").hasClass("ql-blank")
  if (!isBlank) return true

  $(".alert-box").append(`
      <div class="alert alert-danger text-end alert-dismissible fade show" role="alert">
          متن مقاله نمی تواند خالی باشد
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`
    )
  return false
}

// Send Delete Requst
$(".delete-article").on("click", function (e) {
  $.ajax({
    type: "DELETE",
    url: `/articles/${$(this).attr("data-article-id")}`,
    success: function (response) {
      $(".alert-box").append(`
        <div class="alert alert-success text-end alert-dismissible fade show" role="alert">
          ${response}
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      `)

      setTimeout(() => {location.replace("/articles/pages/1")}, 1000)

    },
    error: function (err) {
      $(".alert-box").append(`
        <div class="alert alert-danger text-end aler  t-dismissible fade show" role="alert">
          ${err.responseText}
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      `)
    }
  });
})

// Deleting Comment
$(`.delete-comment`).on('click', function (e) {
  let $this = $(this)
  console.log("delete this comment", );
  $.ajax({
    type: "DELETE",
    url: `/comments/${$this.attr('data-comment-id')}/${$this.attr('data-article-id')}`,
    success: function (response) {
      $(".alert-box").append(`
        <div class="alert alert-success text-end alert-dismissible fade show" role="alert">
          نظر با موفقیت حذف گردید.
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      `)
      setTimeout(()=>{location.reload()}, 1000)
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

// FIXME: MAKE BETTER REDIRECTS