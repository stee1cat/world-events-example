/**
 * Copyright (c) 2017 Gennadiy Khatuntsev <e.steelcat@gmail.com>
 */

const gulp = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');

const publicPath = './public/';
const buildPath = './public/build';

gulp.task('js', function () {
    return browserify({
            entries: publicPath + 'js/app.jsx',
            extensions: ['.jsx'],
            debug: true
        })
        .transform('babelify', {
            presets: ['es2015', 'react']
        })
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest(buildPath));
});

gulp.task('watch', function() {
    gulp.watch(publicPath + 'js/**/*.{js,jsx}', ['js']);
});

gulp.task('build', ['js']);
gulp.task('default', ['build', 'watch']);
