var classicretweet = {
  
  onLoad: function() {
    var appcontent = document.getElementById("appcontent"); // if browser
    if (appcontent) {
      appcontent.addEventListener("DOMContentLoaded", classicretweet.onPageLoad, true);
    }
  },

  onPageLoad: function(event) {
    var doc = event.originalTarget; // doc is document that triggered "onload" event
    if (doc.location.href.match(/http:\/\/twitter.com|https:\/\/twitter.com/)) {
      var scriptUrl = "chrome://classicretweet/content/classic-retweet.js";
      var req = new XMLHttpRequest();
      req.onload = function() {
        var scriptContents = req.responseText;
        var script = doc.createElement("script");
        script.type = "text/javascript";
        script.textContent = scriptContents;
        doc.getElementsByTagName("body")[0].appendChild(script);        
      };
      req.open("GET", scriptUrl, true);      
      req.overrideMimeType("text/plain"); // otherwise will attempt to parse as xml
      req.send(null);
    }    
  }

};

window.addEventListener("load", classicretweet.onLoad, false);
