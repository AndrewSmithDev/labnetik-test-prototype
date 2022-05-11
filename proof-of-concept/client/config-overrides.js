const webpack = require("webpack");

module.exports = function override(config, env) {
  console.log(config);
  config.resolve.alias = {
    ...config.resolve.alias,
    process: "process/browser",
    stream: "stream-browserify",
    zlib: "browserify-zlib",
  };
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    })
  );
  return config;
};
