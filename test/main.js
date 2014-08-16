var compassPlugin = require('../')
  , fs = require('fs')
  , path = require('path')
  , should = require('should')
  , gutil = require('gulp-util');


describe('gulp-compassn', function () {
  it('should compile Compass to Css', function (done) {
    var file = new gutil.File({
      path: 'test/scss/compile.scss',
      cwd: 'test/',
      base: 'test/fixtures',
      contents: fs.readFileSync('test/scss/compile.scss')
    });

    var stream = compassPlugin({ outputStyle: 'compressed' });
    stream.on('data', function (newFile) {
      should.exist(newFile);
      should.exist(newFile.contents);
      newFile.contents.toString().should.equal(fs.readFileSync('test/css/compile.css', { encoding: 'utf-8' }));
      done();
    });

    stream.write(file);
    stream.end();
  });
})