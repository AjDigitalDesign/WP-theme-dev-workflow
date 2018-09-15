var themename = 'underscoresass';

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;


//name of working theme folder
root = '../' + themename + '/',
scss = root + 'sass/'



gulp.task('sass', function(){
     return gulp.src(scss + '{style.scss, rtl.scss}')
        .pipe(sass({outputStyle: 'expandded'}).on('error', sass.logError))
        .pipe(gulp.dest(root));
});

gulp.task('watch', function(){
    browserSync.init({
        open: 'external',
        proxy: 'http://wordpressdev.test/',
        port: 8080
    });
    gulp.watch([root + '**/*.css', root + '**/*.scss'], ['css']);


})

gulp.task('default', ['watch']);