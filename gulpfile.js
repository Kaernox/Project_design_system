// Paramétres du script gulp
var templatesFileName = 'akkurate-design-system.templates.js';
var directivesFileName = 'akkurate-design-system.js';
var moduleName = 'akkurate-design-system';
var outPutFolder = "./dist";
var srcFolder = "./src";
var templatesFolder = srcFolder + '/templates';

// Dépendances
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var templateCache = require('gulp-angular-templatecache');
var minifyHtml = require('gulp-minify-html');
var inject = require('gulp-inject');


gulp.task('templatesCaching', function() {
    return gulp.src(templatesFolder + '/**/*.html')
        .pipe(templateCache(templatesFileName, {
            module: moduleName,
            root: "templates/" // Préfix avant les noms des templates
        }))
        .pipe(gulp.dest(outPutFolder));
});

gulp.task('concat', ['templatesCaching'], function() {
    return gulp.src( [srcFolder + '/**/*.js', outPutFolder + '/' + templatesFileName] )
        .pipe(concat(directivesFileName))
        .pipe(gulp.dest(outPutFolder));
});

gulp.task('minify', ['concat'], function() {
    return gulp.src(outPutFolder + '/' + directivesFileName)
        .pipe(uglify({
            compress: {
                sequences: false // Empéche la transformation des ';' par ','
            }
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(outPutFolder));
});

gulp.task('default', [
    'minify',
//    'index'
]);