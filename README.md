Adds classic-style retweets to #NewTwitter. Because sometimes you want to rock it old school.

Currently comes in two flavors: 1) a Chrome extension, and 2) a bookmarklet (see code below).

<pre>
<code>
  javascript:
  var script = document.createElement("script");
  script.setAttribute("type", "text/javascript");
  script.setAttribute("src", "http://github.com/jonpierce/classic-retweet/raw/master/classic-retweet.js");
  document.getElementsByTagName("body")[0].appendChild(script);
  void(0);
</code>
</pre>

Note: If you use the bookmarklet, bear in mind that you'll have to periodically re-click it since #NewTwitter still occasionally reloads the entire page.