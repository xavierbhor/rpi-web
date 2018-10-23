const fs = require('fs');
const util = require('./util.js');

global.scan = {};

exports.status = function(callback, device) {
    
    util.exec("iwconfig", function (code, stdout, stderr) {
        
        var res = {
            devices:[]
        };

        var lines = stdout.split("\n");
        
        var device = {};

        while (lines.length>0) {
            var line = lines.shift();

            if (line.length >0 && line[0]!=" ") {
                device = {name: line.substr(0, line.indexOf(" ")), status:''};
                line = line.substr(line.indexOf(" "));
                
                res.devices.push(device);
            } 

            device.status += line.trim() + "\n";
        }

        callback(res);
    });

}

exports.statusDevice = function(device_name, callback) {

    util.exec("iwconfig " + device_name, function (code, stdout, stderr) {
        
        var device = {name: device_name, status:''};

        var lines = stdout.split("\n");

        lines[0] = lines[0].substr(lines[0].indexOf(" "));

        while (lines.length>0) {
            var line = lines.shift();
            device.status += line.trim() + "\n";
        }

        callback(device);
    });

}

exports.scan = function(device_name, callback) {

    util.exec("iwlist " + device_name + " scan", function (code, stdout, stderr) {

        var res = {
            wifi:[]            
        };

        var lines = stdout.split("\n");
        
        var wifi = null;

        while (lines.length>0) {
            var line = lines.shift().trim();

            if (line.substr(0, 4) == 'Cell') {
                wifi = {
                    info:""
                };
        
                res.wifi.push(wifi);
                line = line.split(" - ")[1].trim();
            }

            if (wifi) {
                wifi.info += line + "\n";

                if (line.substr(0,5) == "ESSID") {
                    wifi.ESSID = line.substr(7, line.length-8);
                }
            }
        }

        if (callback) callback(res);
        global.scan[device_name] = res;
        return res;
    });

}

exports.info = function(device_name, essid, callback) {
    
    if (!global.scan[device_name]) {
        exports.scan(device_name);
    }

    var res = {};

    for (let wifi of global.scan[device_name].wifi) {
        if (wifi.ESSID == essid) res.info = wifi.info;
    }

    if (fs.existsSync(global.config.wifiConfigPath + essid)) {
        res.config = fs.readFileSync(global.config.wifiConfigPath + essid, 'utf8');
    } else {
        res.config = fs.readFileSync(global.config.wifiConfigPath + 'default', 'utf8');        
        res.config = res.config.replace("#SSID#", essid);
    }
    
    callback(res);
}

exports.conectar = function(device_name, essid, config, callback) {
    
    fs.writeFileSync(global.config.wifiConfigPath + essid, config, 'utf8');

    console.log("EXEC ", global.config.scriptsPath + "wifi_on " + device_name + " " + global.config.wifiConfigPath + essid);

    util.exec(global.config.scriptsPath + "wifi_on " + device_name + " " + global.config.wifiConfigPath + essid, function (code, stdout, stderr) {
            callback(stdout);
    });

}

exports.desconectar = function(device_name, callback) {
    util.exec(global.config.scriptsPath + "wifi_off " + device_name, function (code, stdout, stderr) {
        callback(stdout);
    });
}



/*
global.config = require("../config.json");

exports.info("wlan1", "BORW", function (res) {
    console.log(res);
});

*/