const webpack = require('webpack');

module.exports = function override(config) {
  // Add fallbacks for node core modules
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    "http": require.resolve("stream-http"),
    "https": require.resolve("https-browserify"),
    "stream": require.resolve("stream-browserify"),
    "url": require.resolve("url/"),
    "assert": require.resolve("assert/"),
    "crypto": require.resolve("crypto-browserify"),
    "zlib": require.resolve("browserify-zlib"),
    "util": require.resolve("util/"),
    "buffer": require.resolve("buffer/"),
    "vm": require.resolve("vm-browserify"),
    "process": require.resolve("process/browser")  // Added process fallback
  });
  config.resolve.fallback = fallback;
  
  // Add plugin to provide process and Buffer
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer']
    })
  ]);
  
  // Fix for axios ESM issue
  config.resolve.extensions = [...(config.resolve.extensions || []), '.js', '.jsx', '.mjs'];
  
  // Add rule for .mjs files
  config.module.rules.push({
    test: /\.m?js/,
    resolve: {
      fullySpecified: false
    }
  });
  
  return config;
};