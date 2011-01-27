(function() {
  
  var initClassicRetweet = function()
  {
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
