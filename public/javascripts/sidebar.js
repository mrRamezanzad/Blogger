// handle dashboard special menu functionality for responsiveness
$(".dashboard-menu-button").on("click", function (e) {
    $(this).toggleClass("bi-columns-gap bi-columns")
    $("#dashboard-menu").toggleClass("d-none")

})
