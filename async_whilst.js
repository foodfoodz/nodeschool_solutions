var http = require('http');
var async = require('async');

var receievedPayload = false;
var count = 0;
async.whilst(
  () => { return !receievedPayload },
  function(cb) {
    var body = '';
    http.get(process.argv[2], (res) => {
      res.on('data', (chunk) => {
        body += chunk.toString();
      });
      res.on('end', () => {
        if (body === 'meerkat') receievedPayload = true;
        cb(null, ++count);
      });
    });
  },
  function(err, n) {
    if (err) return console.error(err);
    console.log(n);
  }
);
