var duplexer = require('duplexer2');
var spawn = require('child_process').spawn;

module.exports = function(cmd, args) {
  const processSpawn = spawn(cmd, args);
  return duplexer(processSpawn.stdin, processSpawn.stdout);
};
