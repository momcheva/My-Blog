


$(document).ready(function() {
    $('.sub-menu').prev('a.single-menu-element-link').append('<span class="indicator"></span>');

        $('li.single-menu-element:has(.sub-menu)').hover(function() {
            $(this).find('a .indicator').addClass('hover-indicator');
            $(this).find('ul:first').slideDown('fast').addClass('active');
        }, function () {
            $(this).find('a .hover-indicator').removeClass('hover-indicator');
            $(this).children('ul.active').slideUp('fast').removeClass('active');
        });
});
