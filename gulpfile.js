var cache = require('gulp-cache');
var del = require('del');
var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

// Cleans: "dist" folder, cache
function cleanDist(done) {
    del.sync(['dist/*']);
    cache.clearAll();
    done();
}

// Optimizing JavaScript
function distCssJs() {
    return gulp.src('src/*.js')
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist'));
}

// Build the project
gulp.task('build', gulp.series(
    cleanDist,
    distCssJs
));

// Cleans dist folder
gulp.task('clean', cleanDist);
