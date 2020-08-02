const gulp = require('gulp');
const uglify = require("gulp-uglify");
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');
const browserify = require('browserify');
const babelify = require('babelify');
const fs = require('fs');
const package = require('./package.json');

const outputDescription = `
/*
  © Yandex.Maps User Agreement https://yandex.ru/legal/maps_termsofuse/?lang=en
*/

/* global ymaps */
`;

gulp.task("bundle", function(){
  return browserify({ entries: ["./src/modules/index.js"] })
  .transform(babelify.configure({
    presets: ['@babel/preset-env', '@babel/preset-react'],
    plugins: ['@babel/plugin-proposal-class-properties']
  }))
  .bundle()
  .pipe(source(`${package.name}.min.js`))
  .pipe(buffer())
  .pipe(uglify({ compress: false }))
  .pipe(gulp.dest('./dist'))
  .on('end', () => {
    const output = fs.readFileSync('./dist/stagimap.min.js', 'utf-8');
    fs.writeFile(
      './dist/stagimap.min.js',
      `${outputDescription}\n${output.split('use strict').join('')}`,
      err => {
        if (err) {
          throw err;
        }
      }
    );
  });
});
