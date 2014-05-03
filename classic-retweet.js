(function($) {
  /*
  // To place caret at end of tweet
  var placeCaretAtEnd = function(el) {
    var range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    // el.focus();
  };
  // To reset global tweet dialog, if necessary
  if (dialog.length) {
    dialog.find(".modal-close").on("click", function(event) {
      dialog.find("#tweet-box-global").empty();
      dialog.find(".tweet-counter").removeClass("superwarn").text("140");
    });
  }
  */

  var enabledClass = "classic-retweet-enabled",
      title = "Classic Retweet",
      label = "Classic RT",
      shortLabel = "RT";
  var handler = function(event) {
    var tweet = $(this).closest(".js-actionable-tweet");
    var text = tweet.find(".js-tweet-text").first(); // guard as above
    text.find("a").each(function(index) {
      $(this).text($(this).data("expanded-url"));
    });
    var content = "RT @" + tweet.data("screen-name") + ": " + text.text().trim();
    var dialog = $("#global-tweet-dialog");
    // if we have the new tweet dialog, use that
    if (dialog.length) {
      $("#global-new-tweet-button").trigger("click");
      dialog.find("h3").text(title);
      dialog.find("#tweet-box-global").text(content).focus();
      dialog.find("textarea.tweet-box-shadow").val(content);
      // placeCaretAtEnd(dialog.find("#tweet-box-global").get(0));
    }
    // else use the old one
    else if ($(".twttr-dialog-wrapper").length) {
      // if we have direct access to page vars (e.g. chrome and firefox), open the dialog directly
      if (window.twttr && twttr.widget && twttr.widget.TweetDialog) {
        new twttr.widget.TweetDialog({
          basic: false,
          modal: false,
          draggable: true,
          template: {
            title: title
          },
          defaultContent: content,
          origin: "new-tweet-titlebar-button"
        }).open().focus();
      }
    }
    event.preventDefault();
    event.stopPropagation();
    return false;
  };

  $("#page-container").delegate(".js-actionable-tweet", "mouseover", function() {
    if (!$(this).hasClass(enabledClass)) {
      $(this).addClass(enabledClass);

      var replyAction;
      // if this is an old-style page
      if ((replyAction = $(this).find(".action-reply-container").first()).length) {
        // first() call in statemetn above is to guard against embedded copy
        // ("permalink-tweet" vs "original-tweet") on individual tweet page
        var classicRetweetAction = replyAction.clone();
        classicRetweetAction.removeClass("action-reply-container").addClass("action-rt-container"); // so there's left padding

        var link = classicRetweetAction.find(".js-action-reply");
        link.removeClass("js-action-reply");
        link.removeAttr("data-modal");
        // link.attr("title", title); // none of the other links have titles
        link.find("b").text(label);
        link.find("i").attr("class", "sm-rt"); // TODO: obsolete?
        link.find(".Icon--reply").removeClass("Icon--reply").addClass("Icon--retweet");
        link.on("click", handler);

        replyAction.after(classicRetweetAction);
      }
      // else if this is a new-style page
      else if ((replyAction = $(this).find(".ProfileTweet-action--reply")).length) {
        var classicRetweetAction = replyAction.clone();

        var button = classicRetweetAction.find(".js-actionReply");
        button.removeClass("js-actionReply");
        button.removeAttr("data-modal");
        button.attr("title", title);
        button.find(".Icon").removeClass("Icon--reply").addClass("Icon--retweet");
        button.find(".u-isHiddenVisually").html(title);
        button.on("click", handler);

        var link = classicRetweetAction.find(".js-actionCount");
        link.removeClass("ProfileTweet-actionCount--isZero");
        link.attr("title", title);
        link.find("span").html(shortLabel);
        link.on("click", handler);

        replyAction.after(classicRetweetAction);
      }
    }
  });
})($);
