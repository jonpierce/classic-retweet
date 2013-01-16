NAME = "classicretweet"

JQUERY_SCRIPT = "jquery.min.js"
CLASSIC_RETWEET_SCRIPT = "classic-retweet.js"

BUILD_DIR = File.join(".", "build")

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
  cp JQUERY_SCRIPT, CHROME_BUILD_DIR
  cp CLASSIC_RETWEET_SCRIPT, CHROME_BUILD_DIR
  cp Dir.glob("icon-*.png"), CHROME_BUILD_DIR
  sh "cd #{CHROME_BUILD_DIR}; zip -r #{NAME}.zip * -x #{ZIP_EXCLUDE}"
end

desc "Build Firefox extension"
task :build_firefox => :prep do
  cp_r FIREFOX, BUILD_DIR
  data_dir = File.join(FIREFOX_BUILD_DIR, "data")
  mkdir_p data_dir
  cp JQUERY_SCRIPT, data_dir
  cp CLASSIC_RETWEET_SCRIPT, data_dir
  cp "icon-48.png", File.join(FIREFOX_BUILD_DIR, "icon.png")
  cp "icon-64.png", File.join(FIREFOX_BUILD_DIR)
  sh "cd #{FIREFOX_BUILD_DIR}; cfx xpi"
end

desc "Build Safafi extension"
task :build_safari => :prep do
  mkdir_p SAFARI_EXTENSION_BUILD_DIR
  cp_r Dir[File.join(SAFARI, "*")], SAFARI_EXTENSION_BUILD_DIR
  cp JQUERY_SCRIPT, SAFARI_EXTENSION_BUILD_DIR
  cp CLASSIC_RETWEET_SCRIPT, SAFARI_EXTENSION_BUILD_DIR
  cp "icon-128.png", File.join(SAFARI_EXTENSION_BUILD_DIR, "Icon.png")
  ["128", "48", "32"].each do |size|
    cp "icon-#{size}.png", File.join(SAFARI_EXTENSION_BUILD_DIR, "Icon-#{size}.png")
  end
end

task :default do
end