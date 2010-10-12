var classicretweet = {
  
  getContents: function(url) {
    var ioService = Components.classes["@mozilla.org/network/io-service;1"]
      .getService(Components.interfaces.nsIIOService);
    var scriptableStream = Components.classes["@mozilla.org/scriptableinputstream;1"]
      .getService(Components.interfaces.nsIScriptableInputStream);
    var channel = ioService.newChannel(url, null, null);
    var input = channel.open();
    scriptableStream.init(input);
    var contents = scriptableStream.read(input.available());
    scriptableStream.close();
    input.close();    
    return contents;
  },
  
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
      var scriptContents = classicretweet.getContents(scriptUrl);
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.innerHTML = scriptContents;
      doc.getElementsByTagName("body")[0].appendChild(script);
    }    
  }

};

window.addEventListener("load", classicretweet.onLoad, false);
