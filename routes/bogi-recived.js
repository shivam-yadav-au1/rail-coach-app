var mongodb = require('mongodb');
var DB;

var bogiRecived = function (request, response) {

    var data = {}
    if (request.query.success != null) {
        if (request.query.success == "true") {
            data.success = true;
        } else if(request.query.success == "false"){
            data.failed = true;
        }
    }

    response.render("index.hbs", data);
}

var addNewBogi = function (request, response) {
    console.log("Bogi Received ....")
    var coachNumber = request.body.coachNumber;
    var coachName = request.body.coachName;
    var coachType = request.body.coachType;
    var coachQuantity = request.body.coachQuantity;
    var date = request.body.date;
    console.log(coachName + " " + coachType + " " + coachQuantity + " " + date);

    var data = {
        coachNumber:coachNumber,
        coachName: coachName,
        coachType: coachType,
        coachQuantity: coachQuantity,
        date :date,
        fitmentStatus:false
    }
    DB = request.app.locals.DB;
    DB.collection("bogis").insertOne(data, function (error, result) {
        if (error) {
            console.log("Error occured while inserting data into the collection");
            response.redirect("/bogiReceived?success=false")
            return;
        } else {
            console.log("Data inserted Successfully");
            response.redirect("/bogiReceived?success=true");
        }

    })
    
}

exports.bogiRecived = bogiRecived;
exports.addNewBogi = addNewBogi;