"use strict";

// Require statement for plugins
var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var maps = require('gulp-sourcemaps');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var gulpIf = require('gulp-if');
var del = require('del');


// Imagemin Plugin Minify PNG, JPEG, GIF and SVG images (kept it on default level)
gulp.task('images', function() {
    gulp.src('src/images/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/content'));
});

// Used and array for the stacking order
gulp.task('scripts', function() {
	return gulp.src(['src/js/global.js', 
	                 'src/js/circle/autogrow.js', 
	                 'src/js/circle/circle.js'])
	.pipe(maps.init())
    .pipe(uglify())
    .pipe(concat('all.min.js'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('dist/scripts'));
});

// Outputs sass to css and used the compressed object
gulp.task('styles', function() {
    return gulp.src('src/sass/**/*.scss')
    .pipe(maps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(concat('all.min.css'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('dist/styles'))
    .pipe(browserSync.stream())
});

// Watches for any changes in my sass files 
gulp.task('watch', ['browserSync'], function() {
    gulp.watch('src/*html', ['copyHTML']);
    gulp.watch('src/sass/**/*.scss', ['styles']);
    gulp.watch('src/js/**/*.js', ['scripts']);
    gulp.watch('src/images/**/*', ['images']);
    
// reloader
    gulp.watch('src/*html', browserSync.reload);
    gulp.watch('src/sass/**/*.scss', browserSync.reload);
    gulp.watch('src/js/**/*.js', browserSync.reload);
    gulp.watch('src/images/**/*', browserSync.reload);
});

// Had to use PORT 8080 because I used AWS Cloud9
// If there is a problem with PORT 3000 use PORT 8080
gulp.task('browserSync', function() {
    browserSync.init({
        server: './src',
        port: 3000,
        ui: {port: 3001}
    })
});

// This will take our JS files and put into our HTML files
gulp.task('prodJS', function() {
    return gulp.src('src/**/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulp.dest('dist'))
});

// This is to remove the dist folder
gulp.task('clean', function() {
    del('dist');
});

// Used gulp version 3.9.1 created error when using gulp version 4.0
gulp.task('build', function(callback) {
    runSequence('clean','prodJS', ['scripts', 'styles', 'images'], callback);
});

gulp.task('default', ['build'], function() {
    gulp.start('browserSync', ['watch']);
});