$(document).ready(function(){
    console.log("show Admin Control ");

    $.ajax({
        type:'GET',
        url:'/showAdminOption',
        cache:false,
        contentType:false,
        processData:false,
        success:function(data){
          
            var data = JSON.parse(data);
            var isAdmin = data.isAdmin;
            console.log(isAdmin)

            if(!isAdmin){
                $('.deleteRecord').css('display','none');
               $('.deleteCol').css('display','none');
            }
        },
        error:function(data){
            console.log(data);
        }
    })
})