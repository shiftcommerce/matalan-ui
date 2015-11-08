'use strict';

var gulp          = require('gulp');
var browserSync   = require('browser-sync');
var sass          = require('gulp-sass');
var sourcemaps    = require('gulp-sourcemaps');
var autoprefixer  = require('gulp-autoprefixer');
var minifyCSS     = require('gulp-minify-css');
var scssLint      = require('gulp-scss-lint');
var stylish       = require('gulp-scss-lint-stylish2');
var header        = require('gulp-header');
var handleErrors  = require('../util/handleErrors');
var config        = require('../config').sass;
var pkg           = require('../../package.json');

var banner = [
  '/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @license <%= pkg.license %>',
  ' * Compiled <%= new Date().toUTCString() %>',
  ' */',
  ''
].join('\n');


gulp.task('sass', function () {

  return gulp.src(config.src)

    .pipe(sourcemaps.init())
    .pipe(sass(config.settings))
    .on('error', handleErrors)
    .pipe(autoprefixer())
    .pipe(minifyCSS({
      keepSpecialComments: "*",
      roundingPrecision: -1,
      restructuring: false,
      mediaMerging: false,
      keepBreaks: true,
      advanced: false
    }))
    .pipe(header(banner, {pkg: pkg}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.reload({stream:true}));
});


gulp.task('sass:lint', function()
{
  var reporter = stylish();
  gulp.src('src/scss/**/*.scss')
  .pipe( scssLint({ customReport: reporter.issues, config: '.scsslint.yml' }) )
  .on('error', handleErrors)
  .pipe( reporter.printSummary );
});