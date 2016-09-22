const webpack = require('webpack');
const config = require('./webpack.common');

config.debug = false;
config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
        comments: false,
        mangle: { screw_ie8: true },
        compress: { screw_ie8: true, warnings: false }
    })
);

module.exports = config;
