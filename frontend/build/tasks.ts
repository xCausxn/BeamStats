import * as gulp from 'gulp';

const tasks = [
    'aot',
    'clean',
    'copy',
    'entry',
    'scss',
    'webpack',
];

tasks.forEach(task => gulp.task(task, require(`./tasks/${task}`).default));
