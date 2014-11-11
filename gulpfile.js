//	include gulp
	var gulp = require('gulp');

//	include plugins

	//	livereload
	livereload = require('gulp-livereload');

	//	sass
	var sass = require('gulp-sass');

	//	css
	var minifyCSS = require('gulp-minify-css');

	//	js
	var jshint = require('gulp-jshint');
	var concat = require('gulp-concat');
	var uglify = require('gulp-uglify');

	//	global
	var rename = require('gulp-rename');
	var connect = require('gulp-connect');

//	specific tasks

	//	pages

		// gulp.task('homepage', function() {
		// 	gulp.src('public/styles/*.scss')
		// 		.pipe(sass())
		// 		.pipe(minifyCSS({keepBreaks:true}))
		// 		.pipe(gulp.dest('public/styles/dist/'))
		// 		.pipe(livereload());
		// 	gulp.src('public/scripts/*.js')
		// 		.pipe(jshint())
		// 		.pipe(jshint.reporter('default'))
		// 		.pipe(uglify())
		// 		.pipe(gulp.dest('public/scripts/dist/'))
		// 		.pipe(livereload());
		// });

		gulp.task('homepage', function() {
			gulp.src('public/*.html')
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

		//	/index.html
		gulp.watch(['public/*.html'], ['homepage']);
		// gulp.watch(['public/*.html'], ['homepage']);
		// gulp.watch(['public/scripts/*.js'], ['homepage']);
		// gulp.watch(['public/styles/*.scss'], ['homepage']);

	});

//	build tasks

	gulp.task('rebuild', ['homepage', 'watch', 'connect']);

//	default task

	gulp.task('default', ['watch', 'connect']);
