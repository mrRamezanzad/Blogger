const deleteUserButton     = $("[role=delete-user]"),
      saveEditedUserButton = $("#edit-user")

// Send User Delete Request When Delete Button Clicked
deleteUserButton.on("click", function (e) {

    const userId =  $(this).attr("data-user-id")
    $.ajax({
        type: "DELETE",
        url: `/users/${userId}`,
        success: function (response) {
            console.log("Success>>>>>", response);
            alert("به امید دیدار مجدد")
            location.replace("/")
            
        }, 
        error: function (err) {
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
            alert(response.msg)
            location.replace("/dashboard")
        },
        error: function (err) {''
            console.log("Error >>>>>", err);
            alert(err.responseJSON.err)
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
        return alert("پر کردن تمامی فیلد ها الزامی است")

    if($("input[name='newPassword']").val() !== $("input[name='newPasswordConfirmation']").val())
        return alert("تکرار رمز عبور همخوانی ندارد")
    const updatePasswordInformation = {
        currentPassword: $("input[name='currentPassword']").val(),
        newPassword    : $("input[name='newPassword']").val()
    }
    sendPasswordChangeRequest(updatePasswordInformation)
})

function sendPasswordChangeRequest (updatePasswordInformation) {
    $.ajax({
        type: "PATCH",
        url: "/users/password/",
        data: updatePasswordInformation,
        success: function (response) {
            console.log("Success >>>", response)
            alert(response)
            location.reload()
        },
        error: function (err) {
            console.log("Error >>>", err)
            alert(err.responseText)
        }
    })
}
