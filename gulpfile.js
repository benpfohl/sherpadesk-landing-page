/**
 * Created by Benjamin on 12/10/2014.
 */
var gulp = require('gulp');
var less = require('gulp-less');
var watch = require('gulp-watch');
var shell = require('gulp-shell');
var util = require('gulp-util');

gulp.task('less', function() {
    gulp.src('./css/landing-page.less')
        .pipe(less().on('error', util.log))
        .pipe(gulp.dest('./css'));
});

gulp.task('serve', [], shell.task([
    'npm start'
]));

gulp.task('watch', ['less'], function() {
    watch('./css/landing-page.less', function(){gulp.start('less')});
});

gulp.task('build', ['less'], function() {});

gulp.task('default', [
    'less',
    'watch',
    'serve'
], function() {});