import * as gulp from 'gulp';
import * as webpack from 'webpack';
import { appRoot, tmpRoot } from '../paths';

const webpackConfig = require('../webpack.production');

export default function (done) {
    webpack(webpackConfig, done);
}
