/*
 *  DT173G - Moment 4 (Typescript)
 *  Fredrik Blank
 */

const gulp = require('gulp');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');

/*
 *	Kompilera typescript
 */
gulp.task('compile_ts', function () {
    var task = tsProject
        .src()
        .pipe(tsProject())
        .js
        .pipe(gulp.dest(''));

    return task;
});

/*
 *  Kör tasks som default.
 */
gulp.task('default', ['compile_ts']);