var http = require('http');
var async = require('async');

async.map([process.argv[2], process.argv[3]], function(item, cb) {
  var body = '';
  http.get(item, function(res) {
    res.on('data', function(chunk) {
      body += chunk;
    });
    res.on('end', function() {
      cb(null, body);
    })
  }).on('error', function(e) {
    cb(e);
  });
},
function(err, results) {
  if (err) return console.log(err);
  console.log(results);
});
