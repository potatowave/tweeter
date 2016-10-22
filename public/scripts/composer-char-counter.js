$(function () {

    $('.counter').text('0');

    $('textarea').keyup(function() {

        var currentCount = this.value.length;

        if (currentCount > 140) {

            $('.counter').text(-Math.abs(currentCount - 140));
            $('.counter').css('color', 'red');

        } else {

            $('.counter').text(currentCount);
            $('.counter').css('color', '#244751');

        }

    });

});