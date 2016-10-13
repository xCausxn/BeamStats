const resolve = require('path').resolve;
const webpack = require('webpack');

const paths = require('./paths.ts');
paths.appEntry = resolve(paths.tmpRoot)
paths.stylesRoot = resolve(paths.tmpRoot, 'styles');
paths.appEntry = resolve(paths.tmpRoot, 'bundles/main.aot.ts');
paths.polyfillEntry = resolve(paths.tmpRoot, 'bundles/polyfill.ts');
paths.indexTemplate = resolve(paths.tmpRoot, 'index.ejs');

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
