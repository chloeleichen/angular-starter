var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass');


// JSHint task
gulp.task('lint', function() {
  gulp.src('./app/scripts/*.js')
  .pipe(jshint())
  // You can look into pretty reporters as well, but that's another story
  .pipe(jshint.reporter('default'));
});

// Browserify task
gulp.task('browserify', function() {
  // Single point of entry (make sure not to src ALL your files, browserify will figure it out for you)
  gulp.src(['app/scripts/app.js'])
  .pipe(browserify({
    insertGlobals: true,
    debug: true
  }))
  .on('error', function (err) {
            console.log(err.toString());
            this.emit("end");
  })
  // Bundle to a single file
  .pipe(concat('bundle.js'))
  // Output it to our dist folder
  .pipe(gulp.dest('app/dist'));
});

// Styles task
gulp.task('styles', function() {
  gulp.src('app/styles/*.scss')
  // The onerror handler prevents Gulp from crashing on mistake
  .pipe(sass({onError: function(e) { console.log(e); } }))
  .pipe(gulp.dest('app/dist/'));
});

//Watch
gulp.task('watch', ['lint'], function() {
  // Watch our scripts
  gulp.watch(['app/scripts/*.js', 'app/**/*.js'],[
    'lint',
    'browserify'
  ]);
  gulp.watch(['app/styles/**/*.scss', 'app/scripts/*.scss'], [
    'styles'
  ]);
});

//Default task
gulp.task('default', ['watch']);




