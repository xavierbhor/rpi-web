$(function () {
    $("#btReload").on("click", reload);
});

function reload() {
    
    $("#form").html("");

    $.ajax({url: "/api/adm/mac/info", success: function(result){

        for (var c=0; c<result.devices.length; c++) {
            $("#form").append(
                '<label>' + result.devices[c].name + '</label>' + 
                '<div class="input-group mb-3">' + 
                '   <input type="text" class="form-control" id="txt' + result.devices[c].name + '" value="' + result.devices[c].mac + '">' + 
                '   <div class="input-group-append">' + 
                '      <button class="btn btn-outline-secondary btchange" type="button" data-device="' + result.devices[c].name + '">Change</button>' + 
                '   </div>' + 
                '</div>'
            );
        }

        $(".btchange").on("click", change);  

    }});
}


function change() {
    var device = $(this).data("device");
    var mac = $("#txt" + device).val();

    console.log(device + "=" + mac);
    
    dades = {
        mac: mac
    }

    $.ajax({url: "/api/adm/mac/" + device, data: dades, type: "POST", success: function(result){
        $("#infoConectar").html(result);
    }});

}