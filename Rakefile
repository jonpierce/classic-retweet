NAME = "classicretweet"

JQUERY_SCRIPT = "jquery.min.js"
CLASSIC_RETWEET_SCRIPT = "classic-retweet.js"

BUILD_DIR = File.join(".", "build")

CHROME = "chrome"
FIREFOX = "firefox"
SAFARI = "safari"

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
  ext_dir = File.join(BUILD_DIR, CHROME)
  cp CLASSIC_RETWEET_SCRIPT, ext_dir
  cp Dir.glob("icon-*.png"), ext_dir
  sh "cd #{ext_dir}; zip -r #{NAME}.zip * -x *.DS_Store *.git*"
end

desc "Build Firefox extension"
task :build_firefox => :prep do
  cp_r FIREFOX, BUILD_DIR
  ext_dir = File.join(BUILD_DIR, FIREFOX)
  data_dir = File.join(ext_dir, "data")
  mkdir_p data_dir
  cp JQUERY_SCRIPT, data_dir
  cp CLASSIC_RETWEET_SCRIPT, data_dir
  cp "icon-48.png", File.join(ext_dir, "icon.png")
  cp "icon-64.png", File.join(ext_dir)
  sh "cd #{ext_dir}; cfx xpi"
end

desc "Build Safafi extension"
task :build_safari => :prep do
  ext_dir = File.join(BUILD_DIR, SAFARI, "classicretweet.safariextension")
  mkdir_p ext_dir
  cp_r Dir[File.join(SAFARI, "*")], ext_dir
  cp CLASSIC_RETWEET_SCRIPT, ext_dir
  cp "icon-128.png", File.join(ext_dir, "Icon.png")
  ["128", "48", "32"].each do |size|
    cp "icon-#{size}.png", File.join(ext_dir, "Icon-#{size}.png")
  end
end

task :default do
end