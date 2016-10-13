import * as gulp from 'gulp';
import { appRoot, tmpRoot } from '../paths';

export default function () {
    return gulp.src([`${appRoot}/**/*`, `!${appRoot}/**/*.scss`])
        .pipe(gulp.dest(tmpRoot));
}
