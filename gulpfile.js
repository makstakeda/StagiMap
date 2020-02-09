const gulp = require('gulp');
const fs = require('fs');

gulp.task('build', () => {
  if (!fs.existsSync('build')){
    fs.mkdirSync('build');
  };
  fs.writeFile(
    `build/package.json`,
    `{
  "name": "stagimap",
  "version": "1.0.0",
  "description": "Friendly configurator for Yandex.Maps",
  "main": "index.js",
  "scripts": {},
  "repository": {
    "type": "git",
    "url": "git+https://github.com/makstakeda/StagiMap.git"
  },
  "keywords": [
    "Yandex.Maps",
    "Maps",
    "Google.Maps"
  ],
  "author": "Maxim Eremenko",
  "bugs": {
    "url": "https://github.com/makstakeda/StagiMap/issues"
  },
  "homepage": "https://github.com/makstakeda/StagiMap#readme"
}`,
    err => { if (err) { throw err; } }
  );
  fs.writeFile(
    `build/index.js`,
    `import { StagiMap } from './modules/stagimap'
export default StagiMap;
    `,
    err => { if (err) { throw err; } }
  );
  
  return gulp.src(['src/modules/**/*'])
    .pipe(gulp.dest('build/modules'));
});
