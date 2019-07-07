'use strict'

$(document).ready(function () {
    console.log('document is ready ');

    $('.deleteRecord').click(function (e) {
        var id = $(this).data('q_id');
        console.log("Index ",id);

        $.ajax({
            type:'POST',
            url:'/deleteCoachLowerPosition?id='+id,
            cache:false,
            contentType:false,
            processData:false,
            success:function(data){
                console.log(data);
                window.location.replace("/showCoachLowerPosition");
            },
            error:function(data){
                console.log(data);
            }
        })
    })
})