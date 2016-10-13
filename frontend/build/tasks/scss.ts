import * as gulp from 'gulp';
import * as rename from 'gulp-rename';
import { resolve, dirname } from 'path';
import { root, appRoot, tmpRoot } from '../paths';

const sass = require('gulp-sass');

export default function () {
    return gulp.src(`${appRoot}/**/*.scss`)
        .pipe(sass({
            importer: function (including, sourcePath) {
                let file: string;
                if (including.charAt(0) === '~') {
                    file = resolve(root, 'node_modules', including.slice(1) + '.scss');
                } else {
                    file = resolve(dirname(sourcePath), including);
                }

                return { file };
            }
        }).on('error', sass.logError))
        .pipe(rename(path => {
            path.extname = '.scss';
        }))
        .pipe(gulp.dest(tmpRoot));
}
