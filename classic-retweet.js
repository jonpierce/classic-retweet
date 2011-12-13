(function() {
  
  var initClassicRetweet = function()
  {
    // if newnewtwitter
    if ($("body").hasClass("t1")) {
      $("#page-container").delegate(".tweet", "mouseover", function() {
        var processed = $(this).attr("classic-retweet-processed");
        if (processed != "true") {
          $(this).attr("classic-retweet-processed", "true");
          var replyActions = $(this).find(".action-reply-container");
          if (replyActions.size() > 0) {
            replyActions.each(function(index) {
              var replyAction = $(this);
              var classicRetweetAction = replyAction.clone();
              classicRetweetAction.find(".js-action-reply").attr("title", "Classic RT");
              classicRetweetAction.find(".action-reply").attr("class", "action-rt");
              classicRetweetAction.find("a > b").html("Classic RT");
              replyAction.after(classicRetweetAction);
              classicRetweetAction.find("a").click(function(event) {
                var tweet = $(this).closest(".tweet");
                var text = tweet.find(".js-tweet-text");
                text.find("a").each(function(index) {
                  $(this).html($(this).data("expanded-url"));
                });
                var content = "RT @" + tweet.data("screen-name") + ": " + text.text();
                new twttr.widget.TweetDialog({
                  basic: false,
                  modal: false,
                  draggable: true,
                  template: {
                      title: "Classic Retweet this to your followers"
                  },
                  defaultContent: content,
                  origin: "new-tweet-titlebar-button"
                }).open().focus();
                event.preventDefault();
                event.stopPropagation();
                return false;
              });
            })
          }
        }
      });
    }
    // else just newtwitter
    else {
      $("#page-container").delegate(".tweet", "mouseover", function() {
        var processed = $(this).data("classic-retweet-processed");
        if (processed != "true") {
          $(this).data("classic-retweet-processed", "true");        
          var retweetAction = $(this).find(".retweet-action");
          if (retweetAction.size() > 0) {
            var classicRetweetAction = retweetAction.clone();
            classicRetweetAction.html(classicRetweetAction.html().replace(/Retweet/, "Classic RT"));
            retweetAction.after(classicRetweetAction);
            classicRetweetAction.click(function(event) {
              var tweet = $(this).closest(".tweet");
              var content = "RT @" + tweet.attr("data-screen-name") + ": " + tweet.find(".tweet-text").text();
              new twttr.widget.TweetDialog({
                basic: false,
                modal: false,
                draggable: true,
                template: {
                    title: "Classic Retweet"
                },
                defaultContent: content,
                origin: "new-tweet-titlebar-button"
              }).open().focus();
              event.preventDefault();
              event.stopPropagation();
              return false;
            });
          }
        }
      });  
    }
  };

  var initClassicRetweetAfterJQuery = function()
  {
    if (typeof jQuery == "undefined")
    {
      setTimeout(initClassicRetweetAfterJQuery, 100);
    }
    else
    {
      initClassicRetweet();
    }
  };

  initClassicRetweetAfterJQuery();
    
})();
