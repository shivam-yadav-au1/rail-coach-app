var mongodb = require('mongodb')
var DB;

var bogiFitment = function (request, response) {
    data = {}
    if(request.query.success != null){
        console.log("enter in first if condition")
        if(request.query.success == "true"){
            data.success = true;
        }else{
            data.failed = true;
        }
    }

    response.render("bogi-fitment-records.hbs",data);
}

var showBogiFitmentRecords = function(request,response){
    DB = request.app.locals.DB;
    var data = {}
    DB.collection("bogis").find().toArray(function(error,result){
        if(error){
            console.log("Error: "+error);
            return;
        }
        data.records = result;
        response.render("bogi-fitment-records.hbs",data);
    })
}

var addBogiFitment = function (request, response) {

    var coachName = request.body.coachName;
    var coachType = request.body.coachType;
    var coachQuantity = request.body.coachQuantity;
    var date = request.body.date;
    console.log(coachName + " " + coachType + " " + coachQuantity + " " + date);
    var data = {
        coachName: coachName,
        coachType: coachType,
        coachQuantity: coachQuantity,
        date: date
    }
    DB = request.app.locals.DB;
    DB.collection("bogifitment").insertOne(data, function (error, result) {
        if (error) {
            console.log("Error :" + error);
            response.redirect("/bogiFitment?success=false");

        } else {
            console.log("Successfully Inserted BogiFitment");
            response.redirect("/bogiFitment?success=true");
        }

    });
    
}

var updateBogiStatus = function(request,response){
    console.log("updateBogiStatus Received ...");

    var bogiNumber = request.body.bogiNumber;
    var status = request.body.status;
    console.log(request.body)
    console.log(" BogiNumber :"+bogiNumber+" Status : "+status);
    response.send("Success");

}


exports.bogiFitment = bogiFitment;
exports.addBogiFitment = addBogiFitment;
exports.showBogiFitmentRecords = showBogiFitmentRecords;
exports.updateBogiStatus = updateBogiStatus;