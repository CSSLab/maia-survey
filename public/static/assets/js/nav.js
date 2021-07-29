
$(window).scroll(function() {
    $('.animate_hidden').each(function () {
        var imagePos = $(this).offset().top;
        var topOfWindow = $(window).scrollTop();
        if (imagePos < topOfWindow + 600) {
            $(this).addClass("fadeIn");
        }
    });
});
