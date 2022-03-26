$(document).ready(function(){
    $("#section1").hover(function () {
        $("#flex-img1-hover").fadeIn(250);
        $("#flex-img1").fadeOut(250);
    }, function () {
        $("#flex-img1-hover").fadeOut(250);
        $("#flex-img1").fadeIn(250);
    });
    $("#section2").hover(function () {
        $("#flex-img2-hover").fadeIn(250);
        $("#flex-img2").fadeOut(250);
    }, function () {
        $("#flex-img2-hover").fadeOut(250);
        $("#flex-img2").fadeIn(250);
    });
    $("#section3").hover(function () {
        $("#flex-img3-hover").fadeIn(250);
        $("#flex-img3").fadeOut(250);
    }, function () {
        $("#flex-img3-hover").fadeOut(250);
        $("#flex-img3").fadeIn(250);
    });
})