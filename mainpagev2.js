$(document).ready(function(){
    $("#section1").hover(function () {
        $("#flex-img1-hover").fadeIn("slow");
        $("#flex-img1").fadeOut("slow");
    }, function () {
        $("#flex-img1-hover").fadeOut("slow");
        $("#flex-img1").fadeIn("slow");
    });
    $("#section2").hover(function () {
        $("#flex-img2-hover").fadeIn("slow");
        $("#flex-img2").fadeOut("slow");
    }, function () {
        $("#flex-img2-hover").fadeOut("slow");
        $("#flex-img2").fadeIn("slow");
    });
    $("#section3").hover(function () {
        $("#flex-img3-hover").fadeIn("slow");
        $("#flex-img3").fadeOut("slow");
    }, function () {
        $("#flex-img3-hover").fadeOut("slow");
        $("#flex-img3").fadeIn("slow");
    });
})

