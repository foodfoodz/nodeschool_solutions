var async = require('async');
var fs = require('fs');
var http = require('http');

var fileStream = fs.createReadStream(process.argv[2]);

async.waterfall([
  function(cb) {
    fileStream.on('data', function(chunk) {
      cb(null, chunk.toString());
    });
  },
  function(url, cb) {
    var body = '';
    http.get(url, (res) => {
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
], function(err, results) {
  if (err) return console.error(err);
  console.log(results);
});
