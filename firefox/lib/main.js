var pageMod = require("sdk/page-mod");
var self = require("sdk/self");

pageMod.PageMod({
  include: "*.twitter.com",
  contentScriptFile: [
    self.data.url("jquery.min.js"),
    self.data.url("classic-retweet.js")
  ],
  contentScriptWhen: "ready"
});
