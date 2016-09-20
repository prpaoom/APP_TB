var gulp        = require('gulp'),
    ts          = require('gulp-typescript'),
    sass        = require('gulp-sass'),
    minifyCss   = require('gulp-minify-css');
    
var paths = {
    appJavascript: ['**/*.ts', '!node_modules/**/*.*'],
    appScss: ['assets/**/*.scss', '!node_modules/**/*.*']
}

gulp.task('sass', function () {
  gulp.src(paths.appScss)
    .pipe(sass().on('error', sass.logError)) // this will prevent our future watch-task from crashing on sass-errors
    .pipe(minifyCss({compatibility: 'ie8'})) // see the gulp-sass doc for more information on compatibilitymodes
        .pipe(gulp.dest(function(file) {
            return file.base; // because of Angular 2's encapsulation, it's natural to save the css where the scss-file was
    }));
});

var tsProject = ts.createProject('tsconfig.json'); // loads our configuration

gulp.task('ts', function () {
   var tsResult = tsProject.src(paths.appJavascript) // load all files from our pathspecification
        .pipe(ts(tsProject)); // transpile the files into .js
    
    return tsResult.js.pipe(gulp.dest('')); // save the .js in the same place as the original .ts-file
});

gulp.task('watch', ['sass'],function(){ // brackets makes sure we run ts and sass once before the watch starts
        //gulp.watch(paths.appJavascript, ['ts']); // run the ts-task any time stuff in appJavascript changes
        gulp.watch(paths.appScss, ['sass']); // run the sass-task any time stuff in the appScss changes
    });

// gulp.task('webserver', function() {
//   gulp.src('./') // This indicates the root of our server
//     .pipe(server({
//       livereload: {
//         enable: true, // enables live-reload
//         filter: function(filePath, cb) { // this function tells livereload what to ignore
//           cb( !(/node_modules/.test(filePath)) &&  // ignore anything in node_modules
//               !(/.*ts$/.test(filePath)) && // ignore changes to *.ts-files
//               !(/gulpfile.js$/.test(filePath)) ); // ignore changes to gulpfile.js
//         }
//       },
//       defaultFile: 'src/index.html',
//       open: true      
//     }));
// });