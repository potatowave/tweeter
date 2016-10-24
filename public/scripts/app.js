/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.



$(function () {

    function renderTweets(tweets) {

        var orderArray = [];

        tweets.forEach((item) => {

            var tweetsParsed = createTweetElement(item);
            orderArray.push(tweetsParsed);

        });

        orderArray.reverse();

        $('#tweet-container').append(orderArray);

    }


    function createTweetElement(tweet) {

        var currentTime = $.now();
        var createdTime = tweet.created_at;
        var timeAgo = (currentTime - createdTime);
        var timePosted = "";
        var realname = tweet.user.name;
        var handle = tweet.user.handle;
        var tweetText = tweet.content.text;
        var image = tweet.user.avatars.small;

        if (timeAgo < 6000) {

            timePosted = "A moment ago.";

        } else if (timeAgo >= 6000 && timeAgo < 3600000) {

            timeAgo = timeAgo / 60000;
            timePosted = Math.floor(timeAgo) + " minutes ago.";

        } else if (timeAgo >= 3600000 && timeAgo < 86400000) {

            timeAgo = timeAgo / 3600000;
            timePosted = Math.floor(timeAgo) + " hours ago.";

        } else {

            timeAgo = timeAgo / 86400000;
            timePosted = Math.floor(timeAgo) + " days ago.";

        }



        var $header = $("<header>").addClass("tweet");

        $header.append($('<img src=\'' + image + '\'>').attr('id', 'user-icon'));
        $header.append($('<div>').addClass("realname").text(realname));
        $header.append($('<div>').addClass("username").text(handle));

        var $tweetBody = $('<content>').addClass('tweet-body').text(tweetText);

        var $footer = $('<footer>').attr('id', 'tweet-footer').text(timePosted);

        var $tweetHTML = $('<article>').attr('id', 'tweet-instance');

        $tweetHTML.append($header);
        $tweetHTML.append($tweetBody);
        $tweetHTML.append($footer);

        return $tweetHTML;

    }

// prevent form from submitting and post to it.

    $('form[action=\'/tweets\']').on('submit', function( event ) {
        event.preventDefault();

        if (this.text.value.length > 140) {

            $('.counter').html('Your tweet is too long!');


        } else if (this.text.value === null || this.text.value === '' || this.text.value === undefined) {

            $('.counter').html('Your tweet is empty!').css('color', 'red');

        } else if (this.text.value.length <= 140) {

            $.ajax({

                method: 'post',
                url: '/tweets',
                data: $(this).serialize(),
                success: function () {
                    $('.counter').html('Submitting tweet...');
                    $('#tweet-container').empty();
                    loadTweets();
                    $('.new-tweet').hide();
                    $('.counter').html('0');

                }

            });

        }

    });


    function loadTweets () {

        $.ajax({
            method: 'get',
            url: '/tweets',
            success: function (data) {
                renderTweets(data);
            }
        });

    }

// Composition box show / hide.

    loadTweets();

    $('.new-tweet').hide();

    $('.compose').css( 'cursor', 'pointer' );

    $('.compose').on('click', function (){
        $('.new-tweet').toggle();
        $('textarea').focus();

    });




});