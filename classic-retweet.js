var initClassicRetweet = function()
{
  $("head").append($("<style>.tweet-actions .classic-retweet-action span i { background-position:-176px 0px; } .tweet-actions .classic-retweet-action:hover span i { background-position-x:-192px; }</style>"));

  $("#page-container").delegate(".tweet", "mouseover", function() {
    var addedAttr = "data-classic-retweet-action";
    var added = $(this).attr(addedAttr);
    if (added != "true") {
      $(this).attr(addedAttr, "true");
      var retweetAction = $(this).find(".retweet-action");
      var classicRetweetAction = $("<a href=\"#\" class=\"classic-retweet-action\"><span><i></i><b>Classic RT</b></span></a>");
      retweetAction.after(classicRetweetAction);
      classicRetweetAction.click(function(event) {
        var tweet = $(this).closest(".tweet");
        var content = "RT @" + tweet.attr("data-screen-name") + ": " + tweet.find(".tweet-text").text();
        new twttr.widget.TweetDialog({
          modal: false,
          draggable: true,
          template: {
            title: _("What's happening?")
          },
          defaultContent: content,
          origin: "new-tweet-titlebar-button"
        }).open().focus();
        event.preventDefault();
        event.stopPropagation();
        return false;
      });
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
