const fs = require('fs');
const util = require('./util.js');

exports.info = function(callback) {
    
    fs.readdir("/sys/class/net/", function(err, items) {

        var res = {
            devices:[]
        };

        for (var i=0; i<items.length; i++) {
            var device = {};

            device.name = items[i];
            device.mac = fs.readFileSync("/sys/class/net/" + items[i] + "/address", 'utf8');

            device.mac = device.mac.replace("\n", "");

            res.devices.push(device);
        }

        callback(res);
    });

}

exports.set = function(device, mac, callback) {
    
    util.exec(global.config.scriptsPath + "mac_change " + device + " " + mac, function (code, stdout, stderr) {
        callback(stdout);
    });

}

/*

global.config = require("../config.json");

exports.info(function (res) {
    console.log(res);
});

*/