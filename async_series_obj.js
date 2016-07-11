var http = require('http');
var async = require('async');

async.series({
  requestOne: function(cb) {
    var body = '';
    http.get(process.argv[2], (res) => {
      res.on('data', function(chunk) {
        body += chunk.toString();
      });
      res.on('end', function() {
        cb(null, body);
      });
    }).on('error', function(e) {
      cb(e);
    });
  },
  requestTwo: function(cb) {
    var body = '';
    http.get(process.argv[3], (res) => {
      res.on('data', function(chunk) {
        body += chunk.toString();
      });
      res.on('end', function() {
        cb(null, body);
      });
    }).on('error', function(e) {
      cb(e);
    });
  }
}, function(err, results) {
  if (err) return console.error(err);
  console.log(results);
});
