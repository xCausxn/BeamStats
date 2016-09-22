const path = require('path');
const webpack = require('webpack');
const atl = require('awesome-typescript-loader');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// TODO: load with node-config or something
const config = require('./app.default');

const root = path.resolve(__dirname, '..');
const dist = path.resolve(root, 'dist');
const tsconfig = path.resolve(root, 'tsconfig.json');

const appRoot = path.resolve(root, 'src');
const appEntry = path.resolve(appRoot, 'bundles/main.ts');
const polyfillEntry = path.resolve(appRoot, 'bundles/polyfill.ts');
const indexTemplate = path.resolve(appRoot, 'index.ejs');
const globalStyles = path.resolve(appRoot, 'styles');

const chunkOrder = ['inline', 'polyfill', 'main'];

module.exports = {
    devtool: 'source-map',
    context: root,
    entry: {
        polyfill: polyfillEntry,
        main: appEntry
    },
    output: {
        path: dist,
        filename: 'bundles/[name].bundle.js',
    },
    resolve: {
        extensions: ['', '.ts', '.js'],
        root: appRoot,
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
                            tsconfig: tsconfig
                        }
                    },
                    {
                        loader: 'angular2-template-loader',
                    },
                ],
            },
            {
                exclude: globalStyles,
                test: /\.scss$/,
                loaders: ['raw-loader', 'sass-loader']
            },
            {
                include: globalStyles,
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
        new CleanWebpackPlugin(['dist'], { root, verbose: true }),

        new HtmlWebpackPlugin({
            meta: config.meta,
            template: indexTemplate,
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
            appRoot
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
