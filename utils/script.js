const util = require('./util.js');

exports.list = function () {
    return Object.getOwnPropertyNames(global.script);
}

exports.exec = function (script, callback) {

    var script = global.script[script];
    
    if (script) {
        console.log('exec: ', script);
        util.exec(script, (code, stdout, stderr)=>{callback(stdout)});
    } else {
        console.log("no script");
    }
}
