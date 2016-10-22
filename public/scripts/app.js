/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.



$(function () {

    function renderTweets(tweets) {

        tweets.reverse();

        tweets.forEach((item) => {

            var tweetsParsed = createTweetElement(item);
            $('#tweet-container').append(String(tweetsParsed));

        });

  // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    }


    function createTweetElement(tweet) {

        var currentTime = $.now();
        var createdTime = tweet.created_at;
        var daysAgo = (currentTime - createdTime) / 86400000;
        var realname = tweet.user.name;
        var handle = tweet.user.handle;
        var tweetBody = tweet.content.text;
        var image = tweet.user.avatars.small;

        var tweetHTML = '<article id=\'tweet-instance\'><header class=\'tweet\'><img id=\'user-icon\' src=\'' + image + '\'><div class=\'realname\'>' + realname + '</div><div class=\'username\'>' +  handle + '</div></header><content class=\'tweet-body\'>' + tweetBody + '<footer id=\'tweet-footer\'>' + Math.floor(daysAgo) + ' days ago.</footer></article>';

        return tweetHTML;

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


    loadTweets();

    $('.new-tweet').hide();

    $('.compose').on('click', function (){
        $('.new-tweet').show();
        $('textarea').focus();
    });


});