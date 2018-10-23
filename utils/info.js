const fs = require('fs');
const util = require('./util.js');

exports.ifconfig = function(callback) {
    
    util.exec("ifconfig", function (code, stdout, stderr) {
        callback(stdout);
    });

    
}

exports.iwconfig = function(callback) {
    
    util.exec("iwconfig", function (code, stdout, stderr) {
        callback(stdout);
    });

    
}

exports.ping = function(callback) {
    util.exec("ping www.example.com -c 3", function (code, stdout, stderr) {
        callback(stdout);
    });
}

exports.wget = function(callback) {
    util.exec(" wget -O - http://www.example.com", function (code, stdout, stderr) {
        callback(stdout);
    });
}

exports.traceroute = function(callback) {
    util.exec(" traceroute www.example.com", function (code, stdout, stderr) {
        callback(stdout);
    });
}

exports.ps = function(callback) {
    util.exec("ps -a", function (code, stdout, stderr) {
        callback(stdout);
    });
}

/*
global.config = require("../config.json");

exports.ping(function (res) {
    console.log("-----------------------");
    console.log(res);
    console.log("-----------------------");
});
*/
