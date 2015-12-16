
//	include gulp

	var gulp = require('gulp');

//	include plugins

	//	global

		var connect = require('gulp-connect');
		var livereload = require('gulp-livereload');
		var rename = require('gulp-rename');

	//	sass

		var sass = require('gulp-sass');

	//	css

		var minifyCSS = require('gulp-minify-css');

	//	js

		var jshint = require('gulp-jshint');
		var concat = require('gulp-concat');
		var uglify = require('gulp-uglify');

//	specific tasks

	//	homepage

		gulp.task('homepage', function() {
			gulp.src('public/*.html')
				.pipe(livereload());
			gulp.src('public/styles/*.scss')
				.pipe(sass())
				.pipe(minifyCSS({keepBreaks:true}))
				.pipe(gulp.dest('public/styles/dist/'))
				.pipe(livereload());
			gulp.src('public/scripts/*.js')
				.pipe(jshint())
				.pipe(jshint.reporter('default'))
				.pipe(uglify())
				.pipe(gulp.dest('public/scripts/dist/'))
				.pipe(livereload());
		});

//	global tasks

	gulp.task('connect', function() {
		connect.server({
			root: ['public'],
			port: 8000,
			livereload: true
		});
	});

	gulp.task('watch', function() {

		livereload.listen();

		//	homepage

			gulp.watch([
				'public/*.html',
				'public/styles/*.scss',
				'public/scripts/*.js'
			], ['homepage']);

	});

//	specific tasks

	gulp.task('build', [
		'homepage',
	]);

//	default task

	gulp.task('default', [
		'watch',
		'connect'
	]);
