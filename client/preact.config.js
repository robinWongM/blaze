const { DefinePlugin } = require('webpack');
const ip = require('ip');

module.exports = function (config, env, helpers) {
  // disable css modules
  // uncomment the code below when https://github.com/preactjs/preact-cli/issues/897 gets a solution
  let css = helpers.getLoadersByName(config, 'css-loader')[0];
  css.loader.options.modules = false;

  config.plugins.push(
    new DefinePlugin({
      WS_HOST: JSON.stringify(process.env.WS_HOST !== undefined ? process.env.WS_HOST : `ws://${ip.address()}:3030`),
      WS_SIZE_LIMIT: JSON.stringify(process.env.WS_SIZE_LIMIT || 1e8),
      TORRENT_SIZE_LIMIT: JSON.stringify(process.env.TORRENT_SIZE_LIMIT || 7e8),
    })
  );

  return config;
}