const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const fs = require('fs');

var configFile = process.argv[2];
if (!configFile) configFile = process.env.CONFIGFILE 
if (!configFile) configFile = './config.json';

console.log("start configFile: ", configFile);

global.config = require(configFile);

global.script = JSON.parse(fs.readFileSync("./scripts.json").toString());

const PORT = process.env.NODE_PORT || 5000;

webServer = express();

const auth = require('./auth.js');

global.config.token = Math.random().toString(36).replace(/[^a-z]+/g, '') + Math.random().toString(36).replace(/[^a-z]+/g, '') + Math.random().toString(36).replace(/[^a-z]+/g, '');

const server = http.createServer(webServer);

webServer.use(bodyParser.text());
webServer.use(bodyParser.json());
webServer.use(bodyParser.urlencoded({extended: true}));
webServer.use(cookieParser());

webServer.use('/',  express.static(path.join(__dirname, 'public')))

//*********************************************

require('./api.js').setup(webServer, auth);
require('./api_adm.js').setup(webServer, auth);
require('./api_adm_wifi.js').setup(webServer, auth);

//*********************************************

server.listen(PORT, function () {
    console.log('server listening on port ' + PORT)
});    

