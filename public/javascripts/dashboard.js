const deleteUserButton     = $("[role=delete-user]"),
      saveEditedUserButton = $("#edit-user"),
      MESSAGE_SHOW_INTERVAL= 1000

// Send User Delete Request When Delete Button Clicked
deleteUserButton.on("click", function (e) {

    const userId =  $(this).attr("data-user-id")
    $.ajax({
        type: "DELETE",
        url: `/users/${userId}`,
        success: function (response) {
            console.log("Success>>>>>", response);
            $(".alert-box").append(`
                <div class="alert alert-success text-end alert-dismissible fade show" role="alert">
                    ${response}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`
            )
            setTimeout(()=>{location.replace("/")},MESSAGE_SHOW_INTERVAL)
            
        }, 
        error: function (err) {
            $(".alert-box").append(`
                <div class="alert alert-danger text-end alert-dismissible fade show" role="alert">
                    ${err}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`
            )
            console.log("Error >>>>>", err);
        }
    });
})

// Send New Info To Save On Save Button Click
saveEditedUserButton.on("click", function (e) {  
    
    // Get New User Data
    let editedUserInfo = getEditedUserInfo()
    $.ajax({
        type: "put",
        url: `/users/${$(this).attr('data-user-id')}`,
        data: editedUserInfo,
        success: function (response) {
            console.log("Success >>>>>", response.msg);
            $(".alert-box").append(`
                <div class="alert alert-success text-end alert-dismissible fade show" role="alert">
                    ${response.msg}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`
            )
            setTimeout(()=>{location.replace("/dashboard")},MESSAGE_SHOW_INTERVAL)
        },
        error: function (err) {''
            console.log("Error >>>>>", err);
            
            $(".alert-box").append(`
                <div class="alert alert-danger text-end alert-dismissible fade show" role="alert">
                    ${err.responseJSON.err}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`
            )
        }
    });
})

function getEditedUserInfo () {
    return {
        username: $("[name='username']").val()
    }
}
    
// Send Request To Change Password On Click
$("[data-change-password]").on("click", function (e) {
    if(
        $("input[name='currentPassword']").val().trim() === "" || 
        $("input[name='newPassword']").val().trim() === "" ||
        $("input[name='newPasswordConfirmation']").val().trim() === ""  
    )
        
        return $(".alert-box").append(`
            <div class="alert alert-danger text-end alert-dismissible fade show" role="alert">
                پر کردن تمامی فیلد ها الزامی است
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>`
        )
        

    if($("input[name='newPassword']").val() !== $("input[name='newPasswordConfirmation']").val())
        return $(".alert-box").append(`
            <div class="alert alert-danger text-end alert-dismissible fade show" role="alert">
                تکرار رمز عبور همخوانی ندارد
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>`
        )
    const updatePasswordInformation = {
        currentPassword: $("input[name='currentPassword']").val(),
        newPassword    : $("input[name='newPassword']").val()
    }
    sendPasswordChangeRequest(updatePasswordInformation)
})

function sendPasswordChangeRequest (updatePasswordInformation) {
    $.ajax({
        type: "PATCH",
        url: "/users/",
        data: updatePasswordInformation,
        success: function (response) {
            console.log("Success >>>", response)
            $(".alert-box").append(`
                <div class="alert alert-success text-end alert-dismissible fade show" role="alert">
                    ${response}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`
            )
            setTimeout(()=>{location.reload()},MESSAGE_SHOW_INTERVAL)
        },
        error: function (err) {
            console.log("Error >>>", err)
            $(".alert-box").append(`
                <div class="alert alert-danger text-end alert-dismissible fade show" role="alert">
                    ${err.responseText}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`
            )   
        }
    })
}

// handle dashboard special menu functionality for responsiveness
$(".dashboard-menu-button").on("click", function (e) {
    $(this).toggleClass("bi-columns-gap bi-columns")
    $("#dashboard-menu").toggleClass("d-none")

})