
//	Include gulp
var gulp = require('gulp');

//	Include Plugins

	//	css & sass
	var minifyCSS = require('gulp-minify-css');
	var sass = require('gulp-sass');

	//	js
	var jshint = require('gulp-jshint');
	var concat = require('gulp-concat');
	var uglify = require('gulp-uglify');

	//	global
	var rename = require('gulp-rename');
	var connect = require('gulp-connect');

//	Compile Sass (first before compiling css)
gulp.task('sass', function() {
	return gulp.src('public/styles/*.scss')
		.pipe(concat('styles.scss'))
		.pipe(sass())
		.pipe(rename('compiled.css'))
		.pipe(gulp.dest('public/styles/'));
});

// CSS concat and minify (possibly add autoprefixer)
gulp.task('styles', function() {
  gulp.src(['public/styles/normalize.css', 'public/styles/h5bp.css', 'public/styles/compiled.css'])
    .pipe(concat('styles.css'))
    .pipe(minifyCSS())
    .pipe(rename('master.css'))
    .pipe(gulp.dest('public'))
    .pipe(connect.reload());
});

//	Minify CSS
gulp.task('minify-css', function() {
  gulp.src('public/master.css')
    .pipe(minifyCSS({keepBreaks:true}))
    .pipe(gulp.dest('public'))
});

//	Lint Task
gulp.task('lint', function() {
	return gulp.src('public/scripts/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

//	Concatenate & Minify JS
gulp.task('scripts', function() {
	return gulp.src('public/scripts/*.js')
		.pipe(concat('compiled.js'))
		.pipe(gulp.dest('public/scripts/dist'))
		.pipe(rename('master.js'))
		.pipe(uglify())
		.pipe(gulp.dest('public'))
		.pipe(connect.reload());
});

//	Watch Files For Changes
gulp.task('watch', function() {
	gulp.watch('public/scripts/*.js', ['lint', 'scripts']);
	gulp.watch('public/styles/*.scss', ['sass']);
	gulp.watch('public/styles/*.css', ['styles']);
});

//	Connect
gulp.task('connect', function() {
	connect.server({
		root: ['public'],
		port: 8000,
		livereload: true
	});
});

//	Default Task
gulp.task('default', ['sass', 'styles', 'minify-css', 'lint', 'scripts', 'watch', 'connect']);
 