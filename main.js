var script = document.createElement("script");
script.type = "text/javascript";
script.src = chrome.extension.getURL("classic-retweet.js");
document.getElementsByTagName("body")[0].appendChild(script)
