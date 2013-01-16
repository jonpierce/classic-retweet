var pageMod = require("page-mod");
var self = require("self");

pageMod.PageMod({
  include: "*.twitter.com",
  contentScriptFile: [
    self.data.url("jquery.min.js"),
    self.data.url("classic-retweet.js")
  ],
  contentScriptWhen: "ready"
});
