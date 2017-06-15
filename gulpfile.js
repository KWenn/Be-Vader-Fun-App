'use strict';

// Main dependencies and plugins
var gulp = require('gulp');
var sass = require('gulp-sass');
//var nodemon = require('gulp-nodemon');

/*
gulp.task('node', function() {
      nodemon({
        script: 'server.js',
        ext: 'js',
        env: { 'NODE_ENV': 'development' }
      })
	    .on('start', ['watch'])
	    .on('change', ['watch'])
	    .on('restart', function () {
	      console.log('restarted!');
	    });
});
*/

gulp.task('watch', function () {
	gulp.watch('public/sass/*.scss', ['sass']);
});

gulp.task('sass', function() {
    return gulp.src('public/sass/app.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('public/css/'));
});

//gulp.task('default', ['node', 'sass']);

gulp.task('default', ['sass']);
