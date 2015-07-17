require "bundler/setup"
Bundler.require(:default)
require "logger"
require "pathname"
require "fileutils"

ROOT    = Pathname(File.dirname(__FILE__))
BUNDLES = %w(main.css main.js)
DST_DIR = ROOT.join("public")
SRC_DIR = ROOT.join("src")

task default: %w(build)

task :build do
  sprockets = Sprockets::Environment.new(ROOT) do |env|
    env.logger = Logger.new STDERR

    env.css_compressor = :scss
    env.js_compressor = :uglifier

    env.append_path SRC_DIR.join("css").to_s
    env.append_path SRC_DIR.join("js").to_s
  end

  BUNDLES.each do |bundle|
    assets = sprockets.find_asset bundle
    assets.write_to DST_DIR.join bundle
  end
end
