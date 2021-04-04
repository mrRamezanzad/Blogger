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

  if (checkArticleTitle() && checkArticleContent()) this.submit()

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
  let content = $("#article-content").val()
  if (content.trim().length) return true

  $(".alert-box").append(`
      <div class="alert alert-danger text-end alert-dismissible fade show" role="alert">
          متن مقاله نمی تواند خالی باشد
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`
    )
  return false
}

// Send Delete Requst
$("#delete-article").on("click", function (e) {
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

      setTimeout(() => {
        // Decide Going Back To Lists Or Previous Page
        if(location.pathname.match(/^(\/articles)\/(\w|\d)+/))
          return history.back(1)
        location.reload()
        
      }, 1500)

    },
    error: function (err) {
      $(".alert-box").append(`
        <div class="alert alert-danger text-end alert-dismissible fade show" role="alert">
          ${err}
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      `)
    }
  });
})