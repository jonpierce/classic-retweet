var scripts = ["classic-retweet.js"];
for (var i = 0; i < scripts.length; i++) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = chrome.extension.getURL(scripts[i]);
  document.getElementsByTagName("body")[0].appendChild(script)
}
