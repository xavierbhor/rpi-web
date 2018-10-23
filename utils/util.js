var shell = require('shelljs');

exports.exec = function (cmd, callback) {
    var res = shell.exec(cmd);
    callback(res.code, res.stdout, res.stderr);
}
