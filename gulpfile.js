'use strict';

// Gulp script parameters
var templatesFileName = 'akkurate-design-system.templates.js';
var directivesFileName = 'akkurate-design-system.js';
var moduleName = 'akkurate-design-system';
var outPutFolder = "./dist";
var srcFolder = "./src";
var templatesFolder = srcFolder + '/templates';

// Dépendencies
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var templateCache = require('gulp-angular-templatecache');
var minifyHtml = require('gulp-minify-html');
var inject = require('gulp-inject');
var sass = require('gulp-sass');

/**
 * First we create the template cache for all our templates
 */
gulp.task('templatesCaching', function() {
    return gulp.src(templatesFolder + '/**/*.html')
        .pipe(templateCache(templatesFileName, {
            module: moduleName,
            root: "templates/" // Préfix the names of all templates
        }))
        .pipe(gulp.dest(outPutFolder));
});

/**
 * Second step is to concatenate all the javascript files into one non-minified file, this file is persisted so it can help you with debugging
 */
gulp.task('concat', ['templatesCaching'], function() {
    return gulp.src( [srcFolder + '/**/*.js', outPutFolder + '/' + templatesFileName] )
        .pipe(concat(directivesFileName))
        .pipe(gulp.dest(outPutFolder));
});

/**
 * Finally we minify all the source code
 * @return {[type]} [description]
 */
gulp.task('minify', ['concat'], function() {
    return gulp.src(outPutFolder + '/' + directivesFileName)
        .pipe(uglify({
                compress: {
                    sequences: false // Prevent sequencing functions calls, this will disable the transformation of ';' with ','
                }
            })
            // To show possible errors in the script
            .on('error', function (error) {
                console.log(error);
            })
        )
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(outPutFolder));
});

/**
 * Here we compile our sass code into one css folder
 * @return {[type]} [description]
 */
gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest(outPutFolder));
});

//gulp.task('sass:watch', function () {
//  gulp.watch('./sass/**/*.scss', ['sass']);
//});

// If you want to add additional tasks, create a task like we did above then add the task's name to the array as we did below
gulp.task('default', [
    'minify',
    'sass',
//    'sass:watch',
//    'index'
]);
