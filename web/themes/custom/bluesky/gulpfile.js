/**
 * Created by stefan on 13-12.2019.
 * 
 *
 */

/* jshint node: true */
"use strict";

const gulp = require("gulp"),
  prettyError = require("gulp-prettyerror"),
  watch = require("gulp-watch"),
  prefixer = require("gulp-autoprefixer"),
  uglify = require("gulp-uglify"),
  del = require("del"),
  sass = require("gulp-sass"),
  sourcemaps = require("gulp-sourcemaps"),
  cleancss = require("gulp-clean-css"),
  imagemin = require("gulp-imagemin"),
  runSequence = require('run-sequence'),
  babel = require("gulp-babel");

/**
 * Variables
 *
 */
const path = {
  dist: {
    css: "css/",
    img: "images/"
  },
  src: {
    js: "js/**/*.js",
    style: "sass/styles.scss",
    img: "images/**/*.*",
    fonts: "fonts/**/*.*",
    png: "*.png"
  },
  watch: {
    style: "sass/**/*.scss"
  }
};



/**
 * task
 *
 */


gulp.task("js:dist", function() {
  gulp
    .src(path.src.js)
    .pipe(prettyError())
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: ["es2015"]
      })
    )
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.dist.js));
});

gulp.task("style:dist", function() {
  gulp
    .src(path.src.style)
    .pipe(sass())
    .pipe(
      prefixer({
        browsers: ["last 2 versions"],
        cascade: false
      })
    )
    .pipe(cleancss({ compatibility: "ie9" }))
    .pipe(gulp.dest(path.dist.css));
});

gulp.task("img:dist", function() {
  gulp
    .src(path.src.img)
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 5})
    ]))
    .pipe(gulp.dest(path.dist.img));
});


gulp.task("dist", [
  "js:dist",
  "style:dist",
  "img:dist"
]);

/**
 * deploy
 * 
 * Gulp 4
 * gulp.task('deploy', gulp.series('clean', 'dist'));
 * 
 * For now with gulp 3 used run-sequence
 */
// 

gulp.task('deploy', function(done) {
  runSequence('dist', function() {
    done();
  });
});

/**
 * sass task
 *
 */

gulp.task("style:sass", function() {
  gulp
    .src(path.src.style)
    .pipe(prettyError())
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        sourceMap: true,
        errLogToConsole: true
      })
    )
    .pipe(
      prefixer({
        browsers: ["last 2 versions"],
        cascade: false
      })
    )
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("css"));
});

gulp.task("watch", function() {
    watch([path.watch.style], function(event, cb) {
      gulp.start("style:sass");
    });
  });
  
  gulp.task("default", ["style:sass", "watch"]);