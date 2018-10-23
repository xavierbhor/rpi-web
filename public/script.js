$(function () {

    $.ajax({url: "/api/adm/script", success: function(result){
        for(let script of result) {
            add(script);
        }

        $('a[data-toggle="pill"]').on('shown.bs.tab', function (e) {
            run(e.target.textContent);
        })
    
    }});
    
});

function add(id, fn) {
    var tab = $('<a class="nav-link" id="v-pills-' + id + '-tab" data-toggle="pill" href="#v-pills-' + id + '" role="tab" aria-controls="v-pills-' + id + '" aria-selected="false">' + id + '</a>');
    var content = $('<div class="tab-pane fade" id="v-pills-' + id + '" role="tabpanel" aria-labelledby="v-pills-' + id + '-tab"><pre></pre></div>');

    $("#v-pills-tab").append(tab);
    $("#v-pills-tabContent").append(content); 
}

function run(id) {

    $('#v-pills-' + id + ' pre').html("");

    dades = {
        
    }

    $.ajax({url: "/api/adm/script/" + id, data: dades, type: "POST", success: function(result){
        $('#v-pills-' + id + ' pre').text(result);
    }});    
}
