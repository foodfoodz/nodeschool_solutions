var zlib = require('zlib');
var tar = require('tar');
var crypto = require('crypto');
var gunzip = zlib.createGunzip();

var cipherName = process.argv[2];
var cipherPass = process.argv[3];

var decipher = crypto.createDecipher(cipherName, cipherPass);
var tarParser = tar.Parse();

tarParser.on('entry', function(e) {
  if (e.type === 'File') {
    var hash = crypto.createHash('md5', {encoding: 'hex'});

    e.on('data', function(c) {
      hash.update(c);
    });

    e.on('end', function() {
      console.log(hash.digest('hex') + ' ' + e.path);
    });
  }
});

process.stdin.pipe(decipher).pipe(gunzip).pipe(tarParser);
