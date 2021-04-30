const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const webpack = require("webpack-stream");

const {watch, parallel} = gulp;

let paths = {
  html:['index.html', 'dictionary.html', 'gallery.html'],
  css: ['style-themes.css'],
  script: [ './scripts/script.js', './scripts/modules/**/*.js']
};

let dist = './build/';

const copyHtml = () => {
  return gulp.src(paths.html)
              .pipe(gulp.dest(dist))
              .pipe(browserSync.stream());
};

const buildJs  = () => {
    return gulp.src(paths.script)
                .pipe(webpack({
                    mode: 'development',
                    output: {
                        filename: 'script.js'
                    },
                    watch: false,
                    devtool: "source-map",
                    module: {
                        rules: [
                          {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                              loader: 'babel-loader',
                              options: {
                                presets: [['@babel/preset-env', {
                                    debug: true,
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                              }
                            }
                          }
                        ]
                      }
                }))
                .pipe(gulp.dest(dist))
                .on("end", browserSync.reload);
};

const copyAssets = () => {
  return gulp.src("./assets/**/*.*")
              .pipe(gulp.dest(dist + "/assets"))
              .on("end", browserSync.reload);
};

const browser = () => {
  browserSync.init({
    server: {
      baseDir: "./build"
    },
    port: 4000,
    open: true,
    notify: false
  });
}

const check = () => {
  watch("./index.html", parallel(copyHtml));
  watch("./dictionary.html", parallel(copyHtml));
  watch("./gallery.html", parallel(copyHtml));
  watch("./assets/**/*.*", parallel(copyAssets));
  watch("./scripts/**/*.js", parallel(buildJs));
};

exports.default = parallel(copyHtml, copyAssets, browser, buildJs, check);