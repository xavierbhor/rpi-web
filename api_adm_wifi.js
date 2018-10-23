const wifi = require('./utils/wifi.js');

exports.setup = function(webServer, auth) {
   
    webServer.get('/api/adm/wifi/status', auth, function(req, res) {
        wifi.status(function (result) {
            res.send(result);
        });
    });
    
    webServer.get('/api/adm/wifi/status/:device', auth, function(req, res) {
        wifi.statusDevice(req.params.device, function (result) {
            res.send(result);
        });
    });

    webServer.get('/api/adm/wifi/scan/:device', auth, function(req, res) {
        wifi.scan(req.params.device, function (result) {
            res.send(result);
        });
    });

    webServer.get('/api/adm/wifi/info/:device/:essid', auth, function(req, res) {
        wifi.info(req.params.device, req.params.essid, function (result) {
            res.send(result);
        });
    });

    webServer.post('/api/adm/wifi/connect/:device/:essid', auth, function(req, res) {
        wifi.conectar(req.params.device, req.params.essid, req.body.config, function (result) {
            res.send(result);
        });
    });

    webServer.get('/api/adm/wifi/disconnect/:device', auth, function(req, res) {
        wifi.desconectar(req.params.device, function (result) {
            res.send(result);
        });
    });

}

