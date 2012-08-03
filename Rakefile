NAME = "classicretweet"
CHROME_EXTENSION = "#{NAME}.zip"
FIREFOX_EXTENSION = "#{NAME}.xpi"

CLASSIC_RETWEET_SCRIPT = "classic-retweet.js"

TEMP_DIR = File.join(".", "tmp")
BUILD_DIR = File.join(TEMP_DIR, "build")

CHROME = "chrome"
FIREFOX = "firefox"
SAFARI = "safari"

CHROME_BUILD_DIR = File.join(BUILD_DIR, CHROME)
FIREFOX_BUILD_DIR = File.join(BUILD_DIR, FIREFOX)
SAFARI_BUILD_DIR = File.join(BUILD_DIR, SAFARI)
SAFARI_EXTENSION_BUILD_DIR = File.join(SAFARI_BUILD_DIR, "classicretweet.safariextension")

ZIP_EXCLUDE = "*.DS_Store *.git*"

desc "Clean"
task :clean do
  rm_rf BUILD_DIR
end

desc "Prep"
task :prep => :clean do
  mkdir_p BUILD_DIR
end

desc "Build all"
task :build => [:build_chrome, :build_firefox, :build_safari] do
end

desc "Build Chrome extension"
task :build_chrome => :prep do
  cp_r CHROME, BUILD_DIR
  cp CLASSIC_RETWEET_SCRIPT, CHROME_BUILD_DIR
  cp Dir.glob("icon-*.png"), CHROME_BUILD_DIR
  sh "cd #{CHROME_BUILD_DIR}; zip -r #{CHROME_EXTENSION} * -x #{ZIP_EXCLUDE}"
end

desc "Build Firefox extension"
task :build_firefox => :prep do
  cp_r FIREFOX, BUILD_DIR
  cp CLASSIC_RETWEET_SCRIPT, File.join(FIREFOX_BUILD_DIR, "chrome", "content")
  cp "icon-32.png", File.join(FIREFOX_BUILD_DIR, "icon.png")
  cp "icon-32.png", File.join(FIREFOX_BUILD_DIR, "chrome", "skin", "icon.png")
  sh "cd #{FIREFOX_BUILD_DIR}; zip -r #{FIREFOX_EXTENSION} * -x #{ZIP_EXCLUDE}"
end

desc "Build Safafi extension"
task :build_safari => :prep do
  mkdir_p SAFARI_EXTENSION_BUILD_DIR
  cp_r Dir[File.join(SAFARI, "*")], SAFARI_EXTENSION_BUILD_DIR
  cp CLASSIC_RETWEET_SCRIPT, SAFARI_EXTENSION_BUILD_DIR
  cp "icon-128.png", File.join(SAFARI_EXTENSION_BUILD_DIR, "Icon.png")
  ["128", "48", "32"].each do |size|
    cp "icon-#{size}.png", File.join(SAFARI_EXTENSION_BUILD_DIR, "Icon-#{size}.png")
  end
end

task :default do
end