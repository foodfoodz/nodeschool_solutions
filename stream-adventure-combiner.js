var combine = require('stream-combiner');
var split = require('split');
var zlib = require('zlib');
var through = require('through2');

module.exports = function() {
  var results;
  var stream = through(function(buf, _, next) {
    if (buf.length === 0) {
      this.push(JSON.stringify(results) + '\n');
      this.push(null);
      return;
    }
    var obj = JSON.parse(buf.toString());
    if (obj.type === 'genre') {
      if (results) this.push(JSON.stringify(results) + '\n');
      results = {"name":obj.name, "books":[]};
    }
    else if (obj.type === 'book') {
      results.books.push(obj.name);
    }
    next();
  });

  return combine(split(), stream, zlib.createGzip());
};
