$(function () {
    $("#btReload").on("click", reload);
    $("#btReloadDet").on("click", reloadDet);
    $("#btScan").on("click", scan);
    $("#btReloadConect").on("click", reloadConnect);
    $("#btConectar").on("click", connect);    
    $("#btDisconnect").on("click", disconnect);        
});

function reload() {
    
    $("#info").html("");

    $.ajax({url: "/api/adm/wifi/status", success: function(result){
        
        for(var c=0; c<result.devices.length; c++) {
            var device = result.devices[c];
            $("#info").append("<h3><a href='wifi_det.html?device=" + device.name + "'>" + device.name + "</a></h3><pre>" + device.status + "</pre>");
        }

    }});
}

function reloadDet() {
    var p_device = location.href.split("?device=")[1];
    $("#device").html(p_device);

    if (p_device) {
        $.ajax({url: "/api/adm/wifi/status/" + p_device, success: function(device){
            $("#device").html(device.name);
            $("#status").html(device.status);
        }});
    }
}


function scan() {
    
    $("#divScanList").html("");

    var p_device = location.href.split("?device=")[1];
    if (p_device) {
        $.ajax({url: "/api/adm/wifi/scan/" + p_device, success: function(result){
            for(var w=0; w<result.wifi.length; w++) {
                $("#divScanList").append("<a href='wifi_connect.html?device=" + p_device + "&essid=" + result.wifi[w].ESSID + "' class='list-group-item list-group-item-action'>" + result.wifi[w].ESSID + "</a>");
            }
        }});
    }
}

function reloadConnect() {
    
    var p_device = querystring.device;
    var p_essid = querystring.essid;

    $("#device").html(p_device);

    if (p_device) {
        $.ajax({url: "/api/adm/wifi/info/" + p_device + "/" + p_essid, success: function(wifi){
            $("#info").html(wifi.info);
            $("#config").val(wifi.config);
        }});
    }
}

function connect() {

    var p_device = querystring.device;
    var p_essid = querystring.essid;

    var dades = {
        config: $("#config").val()
    }

    $("#divScanList").html("");

    if (p_device) {
        $.ajax({url: "/api/adm/wifi/connect/" + p_device + "/" + p_essid, data: dades, type: "POST", success: function(result){
            $("#infoConectar").html(result);
        }});
    }
}

function disconnect() {

    var p_device = querystring.device;

    $.ajax({url: "/api/adm/wifi/disconnect/" + p_device, success: function(result){
        reloadDet();
    }});
}
