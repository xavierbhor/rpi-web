var colors=['navy', 'limegreen', 'tomato', 'gold'];

$(function () {
    $(".btNum").on("click", clickBoto);
    $(".btNum").data("val", 0);

    $("#btLogin").on("click", login);
});

function clickBoto() {
    var val = parseInt($(this).data("val"))+1;
    if (val == colors.length) val = 0;
    $(this).data("val", val);
    $(this).css("background-color", colors[val]);
}

function login() {
    var botons =  $(".btNum");

    var password = "";

    for (var c=0; c<botons.length; c++) {
        password += $(botons[c]).data("val");
    }

    var dades = {
        password: password
    }

    $.ajax({url: "/api/login", data: dades, type: "POST", success: function(result){
        document.location.href = "main.html";
    }});

}