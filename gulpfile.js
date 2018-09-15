var themename = 'underscoresass';

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');
var postcss = require('gulp-postcss');
var jshint = require('gulp-jshint');



//name of working theme folder
root = '../' + themename + '/',
scss = root + 'sass/',
js = root + 'assets/js/'

//Dstination file for production
jsproduction = root + 'assets/production/js'




gulp.task('sass', function(){
     return gulp.src(scss + '{style.scss, rtl.scss}')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'expandded'}).on('error', sass.logError))
        .pipe(postcss([
            autoprefixer('last 2 versions', '> 1%')
        ]))
        .pipe(sourcemaps.write(scss + 'maps'))
        .pipe(gulp.dest(root));
});


gulp.task('scripts', function(){
    return gulp.src([js + '*.js'])
    .pipe(concat('min.js'))
    .pipe(gulp.dest(jsproduction))
});

gulp.task('watch', function(){
    browserSync.init({
        open: 'external',
        proxy: 'http://wordpressdev.test/',
        port: 8080
    });
    gulp.watch([root + '**/*.css', root + '**/*.scss'], ['sass']);
    gulp.watch(js + '**/*.js', ['scripts']);
    gulp.watch(root + '**/*').on('change', browserSync.reload);


})

gulp.task('default', ['watch']);