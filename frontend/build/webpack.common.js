require('./ts-node');
require('ts-node/register');

const path = require('path');
const webpack = require('webpack');
const atl = require('awesome-typescript-loader');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// TODO: load with node-config or something
const config = require('../config/default');

const paths = require('./paths.ts');

const chunkOrder = ['inline', 'polyfill', 'main'];

module.exports = {
    devtool: 'source-map',
    context: paths.root,
    entry: {
        polyfill: paths.polyfillEntry,
        main: paths.appEntry
    },
    output: {
        path: paths.distRoot,
        filename: 'bundles/[name].bundle.js',
    },
    resolve: {
        extensions: ['', '.ts', '.js'],
        root: paths.appRoot,
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loaders: [
                    {
                        loader: 'awesome-typescript-loader',
                        query: {
                            useForkChecker: true,
                            tsconfig: paths.tsconfig
                        }
                    },
                    {
                        loader: 'angular2-template-loader',
                    },
                ],
            },
            {
                exclude: paths.stylesRoot,
                test: /\.scss$/,
                loaders: ['raw-loader', 'sass-loader']
            },
            {
                include: paths.stylesRoot,
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.html$/,
                loaders: ['raw-loader']
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist'], { root: paths.root, verbose: true }),

        new HtmlWebpackPlugin({
            meta: config.meta,
            template: paths.indexTemplate,
            hash: true,
            chunksSortMode: (a, b) => chunkOrder.indexOf(a.names[0]) > chunkOrder.indexOf(b.names[0]),
        }),

        new atl.ForkCheckerPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            minChunks: Infinity,
            name: 'inline',
            filename: 'bundles/inline.bundle.js',
            sourceMapFilename: 'inline.bundle.map'
        }),

        // Fix for critical dependency warning due to System.import in angular.
        // See https://github.com/angular/angular/issues/11580
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            paths.appRoot
        ),
    ],
    devServer: {
        port: 8080,
        historyApiFallback: true
    },
    node: {
        fs: 'empty',
        global: 'window',
        crypto: 'empty',
        module: false,
        clearImmediate: false,
        setImmediate: false
    }
};
