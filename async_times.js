var async = require('async');
var http = require('http');

var reqOptions = {
  hostname: process.argv[2],
  port: process.argv[3],
  method: 'POST',
  path: '/users/create',
  headers: {
    'Content-Type': 'application/json'
  }
};

async.series([
  function(cb) {
    async.times(5, function(n, next) {
      var body = '';
      var postData = JSON.stringify({"user_id": n});
      var req = http.request(reqOptions, (res) => {
        res.on('data', (chunk) => {
          //body += chunk;
          console.log(chunk);
        });
      }).on('error', (e) => {
        console.error(e);
      });
      req.write(postData);
      req.end();
    });
  },
  function(cb) {
    var body = '';
    var url = process.argv[2] + '' + process.argv[3] + '/users';
    console.log(url);
    http.get(url, (res) => {
      console.log('we get here');
      res.on('data', (chunk) => {
        console.log(chunk);
        body += chunk;
      });
      res.on('end', () => {
        cb(null, body);
      });
    }).on('error', (e) => {
      console.error(e);
    });
  }
],
function(err, results) {
  if (err) return console.error(err);
  console.log(results);
});
