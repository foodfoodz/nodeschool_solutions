var http = require('http');
var through = require('through2');

var stream = through(function(buffer, enc, next) {
  this.push(buffer.toString().toUpperCase());
  next();
});

var server = http.createServer(function(req, res) {
    if (req.method === 'POST') {
      req.pipe(stream).pipe(res);
    }
}).listen(process.argv[2]);
