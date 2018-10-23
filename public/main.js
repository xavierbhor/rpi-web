$(function () {
    $("#btReboot").on("click", reboot);
    $("#btShutdown").on("click", shutdown);
});


function reboot() {
    if (confirm("segur?")) {
        $.ajax({url: "/api/adm/reboot", success: function(result){
            alert(result);
        }});
    }
}

function shutdown() {
    if (confirm("segur?")) {
        $.ajax({url: "/api/adm/shutdown", success: function(result){
            alert(result);
        }});
    }
}