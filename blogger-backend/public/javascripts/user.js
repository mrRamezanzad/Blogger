// card hover shadow effect
$(document).on("mouseover mouseout", ".card", function () {
    $(this).toggleClass("shadow");
});

// Send User Delete Request
$('.card__delete-user').on('click', function (e) {
    $.ajax({
        type: "DELETE",
        dataType: "raw/text",
        url: `/users/${$(this).attr('data-user-id')}`,
        success: function (response) {
            $(".alert-box").append(`
                <div class="alert alert-success text-end alert-dismissible fade show" role="alert">
                    کاربر مورد نظر با موفقیت حذف گردید.
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`
            )

            setTimeout(() => {location.reload()}, 1000)
           
        },
        error: function (err) {
            $(".alert-box").append(`
                <div class="alert alert-danger text-end alert-dismissible fade show" role="alert">
                    ${err.responseText}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`
            )
        }
    });
})

// Send Password Recovery Request
$('.card__reset-password').on('click', function (e) {
    $.ajax({
        type: "get",
        url: `/users/${$(this).attr('data-user-id')}/resetpassword/`,
        success: function (response) {
            $(".alert-box").append(`
            <div class="alert alert-success text-end alert-dismissible fade show" role="alert">
            ${response}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>`
            )
        },
        error: function (err) {
            $(".alert-box").append(`
                <div class="alert alert-danger text-end alert-dismissible fade show" role="alert">
                    ${err.responseText}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`
            )
        }
    })
})