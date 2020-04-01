$(document).ready(function () {
    $('.switch-button-case.left').click(function () {
        $('.switch-button-case.left').addClass("active-case");
        $('.switch-button-case.right').removeClass("active-case");
        $('.switch-button-case.right').addClass("not-active");
        $('.switch-button-case.left').removeClass("not-active");
        $('.switch-button .active').css("left", "0%");
        $('.switch-button .active').css("backgroundPosition", "0%");
        $('.login').removeClass("hidden");
        $('.login').addClass("visible");
        $('.register').removeClass("visible");
        $('.register').addClass("hidden");
    })
    $('.switch-button-case.right').click(function () {
        $('.switch-button-case.right').addClass("active-case");
        $('.switch-button-case.left').removeClass("active-case");
        $('.switch-button-case.left').addClass("not-active");
        $('.switch-button-case.right').removeClass("not-active");
        $('.switch-button .active').css("left", "50%");
        $('.switch-button .active').css("backgroundPosition", "100%");
        $('.login').removeClass("visible");
        $('.login').addClass("hidden");
        $('.register').removeClass("hidden");
        $('.register').addClass("visible");
    })
})(jQuery);