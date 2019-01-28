// This is our main Javascript file which can be found in src/js and all our logic can be found here
// Developed by Vukasin Lukic for CVS Project

$(function() {
    $('.resetuj-lozinku').on('click', function() {
        $('#login-form').hide();
        $('#reset-password').fadeIn();
    });
    $('.back-to-login').on('click', function() {
        $('#reset-password').hide();
        $('#login-form').fadeIn();
    });
    if ($('#rbtechadvancedform-formtype1')) {
        $('#rbtechadvancedform-formtype1 input[type="button"]').on('click', function() {
            if ($('#email-error').text() != '') {
                var offsetTop = $('#email-error').offset().top;
                $('html, body').animate({
                    scrollTop: offsetTop - 80
                }, 1000);
            }
        });
    }
});