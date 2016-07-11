var trumpet = require('trumpet');
var fs = require('fs');
var through = require('through2');

var tr = trumpet();


var upperTransformStream = through(function(buf, enc, next) {
  this.push(buf.toString().toUpperCase());
  next();
});

var loudSelector = tr.select('.loud').createStream();
loudSelector.pipe(upperTransformStream).pipe(loudSelector);
process.stdin.pipe(tr).pipe(process.stdout);
