var map = require('map-stream')
  , compass = require('compass-node')
  , merge = require('utils-merge');

module.exports = function (options) {
  return map(function (file, fn) {
    var isStream = file.contents && 
      typeof file.contents.on === 'function' &&
        typeof file.contents.pipe === 'function';
    var isBuffer = file.contents instanceof Buffer;

    if (isStream) {
      return fn(new Error('gulp-compassn: Streams are not supported!'));
    }

    if (isBuffer) {
      compass.render(file.path, merge({
        data: file.contents.toString(),
        success: function (css) {
          file.contents = new Buffer(css.css);
          file.path = file.path.replace(/\.scss$/, '/.css');
          fn(null, file);
        },
        error: function (error) {
          fn(new Error(error));
        }
      }, options));
    }
  });
}