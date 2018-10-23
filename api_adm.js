const mac = require('./utils/mac.js');
const info = require('./utils/info.js');
const util = require('./utils/util.js');
const script = require('./utils/script.js');

exports.setup = function(webServer, auth) {
    
    webServer.get('/api/adm/info/ifconfig', auth, function(req, res) {
        info.ifconfig(function (result) {
            res.send(result);
        });
    });

    webServer.get('/api/adm/info/iwconfig', auth, function(req, res) {
        info.iwconfig(function (result) {
            res.send(result);
        });
    });

    webServer.get('/api/adm/info/ping', auth, function(req, res) {
        info.ping(function (result) {
            res.send(result);
        });
    });

    webServer.get('/api/adm/info/ps', auth, function(req, res) {
        info.ps(function (result) {
            res.send(result);
        });
    });

    webServer.get('/api/adm/info/wget', auth, function(req, res) {
        info.wget(function (result) {
            res.send(result);
        });
    });

    webServer.get('/api/adm/info/traceroute', auth, function(req, res) {
        info.traceroute(function (result) {
            res.send(result);
        });
    });

    webServer.get('/api/adm/reboot', auth, function(req, res) {
        util.exec("reboot", function (code, stdout, stderr) {
            res.send(stdout);
        });
    });

    webServer.get('/api/adm/shutdown', auth, function(req, res) {
        util.exec(" sudo shutdown -P now", function (code, stdout, stderr) {
            res.send(stdout);
        });
    });

    webServer.get('/api/adm/mac/info', auth, function(req, res) {
        mac.info(function (result) {
            res.send(result);
        });
    });

    webServer.post('/api/adm/mac/:device', auth, function(req, res) {
        mac.set(req.params.device, req.body.mac, function (result) {
            res.send(result);
        });
    });

    webServer.get('/api/adm/script', auth, function(req, res) {
        res.send(script.list());
    });

    webServer.post('/api/adm/script/:script', auth, function(req, res) {
        script.exec(req.params.script, function (result) {
            res.send(result);
        });
    });

}

