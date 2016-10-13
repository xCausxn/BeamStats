import * as gulp from 'gulp';
import * as runSequence from 'run-sequence';

import './build/tasks';

gulp.task('default', done => {
    runSequence(
        'clean',
        ['copy', 'scss'],
        'aot',
        'entry',
        'webpack',
        done
    );
});
