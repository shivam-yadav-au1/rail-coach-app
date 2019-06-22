'use strict'
var bogiNumber;
$(document).ready(function(){
    $('.updateLink').click(function(e){
      
        e.preventDefault();
        bogiNumber = $(this).attr('name');
        //console.log(bogiNumber)
        $('#exampleModalCenter').modal('toggle')
    })
    $('#updateBogiStatus').on('submit',(function(e){
        e.preventDefault();
        console.log(bogiNumber)
        var status = $('#bogisubTypeSelect').find(":selected").text();
        console.log(status);
        var formData = new FormData();
        formData.append("bogiNumber",bogiNumber);
        formData.append("status",status);
        $.ajax({
            type:'POST',
            url:$(this).attr('action'),
            data:formData,
            cache:false,
            contentType:false,
            processData:false,
            success:function(data){
                console.log(data);
            },
            error:function(data){
                // console.log(data);
            }
        });
    }));

    $('#submitUpdateBogiForm').on("click",function(){
        console.log("Submit Button Clicked ...")
        $("#updateBogiStatus").submit();
    })
})