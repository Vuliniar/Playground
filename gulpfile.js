/* ------------------------------------------------------------------------------
 *
 *  # Gulp file
 *
 *  Basic Gulp tasks for CVS Project
 *  Author: Vukasin Lukic
 *
 *  Version: 1.0
 *  Latest update: September 7th, 2018
 *
 * ---------------------------------------------------------------------------- */


// Include gulp
var gulp = require('gulp');

// Include gulp plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var minifyCss = require('gulp-clean-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// Lint task
gulp.task('lint', function() {
    return gulp
        .src('src/js/app.js') // lint core JS file. Or specify another path
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile our less files
gulp.task('sass', function() {
    return gulp
        .src('src/style/*.scss') // locate main sass file
        .pipe(sass().on('error', sass.logError))
        .pipe(sass()) // compile sass files
        .pipe(gulp.dest('dist/style')) // destination path for normal CSS output
        .pipe(minifyCss({ // minify new CSS
            keepSpecialComments: 0 // remove all comments
        }))
        .pipe(rename({ // rename file CSS file to
            suffix: ".min" // add *.min suffix
        }))
        .pipe(gulp.dest('dist/style')); // destination path for minified CSS
});

// Concatenate & minify JS
gulp.task('concatenate', function() {
    return gulp
        .src(['src/js/*.js']) // path to js files you want to concat
        .pipe(concat('all.js')) // output file name
        .pipe(gulp.dest('dist/js')) // destination path for normal JS
        .pipe(rename({ // rename file
            suffix: ".min" // add *.min suffix
        }))
        .pipe(uglify()) // compress JS
        .pipe(gulp.dest('dist/js')); // destination path for minified JS
});

// Watch js/sass files for changes
gulp.task('watch', function() {
    gulp.watch('src/js/app.js', [ // listen for changes in app.js file and automatically compress
        'lint', // lint
        'concatenate', // concatenate & minify JS files
    ]);
    gulp.watch('src/style/**/*.scss', ['sass']); // listen for changes in all SASS files and automatically recompile
});


// Default task
gulp.task('default', [ // list of default tasks
    'lint', // lint
    'sass', // less compile
    'concatenate', // concat
    'watch' // watch for changes
]);