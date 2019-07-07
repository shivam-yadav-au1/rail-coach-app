var mongodb = require('mongodb');
var DB;

var coachLowerPosition = function (request, response) {


    if (!request.session.user) {
        response.redirect("/");
        return;
    }

    var bogie = {};
    //console.log(request.query.success);
    if (request.query.success) {

        bogie.added = true;
    }

    response.render("coach-lower-position.hbs", bogie);


}

var addCoachLowerPosition = function (request, response) {


    var staffName = request.body.StaffName
    var coachType = request.body.coachType
    var coachNo = request.body.coachNo
    var coachNumber = coachType + coachNo
    var brakePanelType = request.body.brakePanelType
    var bogieNo = request.body.bogieNo
    var bogieCaliper = request.body.bogieCaliper
    var shellNo = request.body.shellNo
    var cbcType = request.body.cbcType
    var shimPPNPP = request.body.shimPPNPP
    var cbcHeightPPNPP = request.body.cbcHeightPPNPP

    var date = request.body.date


    var coachPosition = {
        staffName: staffName,
        coachNumber: coachNumber,
        bogieNo: bogieNo,
        brakePanelType: brakePanelType,
        bogieCaliper: bogieCaliper,
        shellNo: shellNo,
        cbcType: cbcType,
        shimPPNPP: shimPPNPP,

        cbcHeightPPNPP: cbcHeightPPNPP,

        date: date
    }

    // console.log(coachPosition);
    DB = request.app.locals.DB;
    DB.collection("coachLowerPosition").insertOne(coachPosition, function (error, result) {
        if (error) {
            console.log("Error ==>", error);
            return;
        }

    })

    // response.render("coach-lower-position.hbs");
    response.redirect("/coachLowerPosition?success=true");
}

var showCoachLowerPosition = function (request, response) {
    DB = request.app.locals.DB;
    var data = {}
    var loggedInUser = request.session.user;
    console.log("loggedInUser ",loggedInUser);
    DB.collection("coachLowerPosition").find().toArray(function (error, result) {
        if (error) {
            console.log("Error :", error);
            return;
        }
        // data.records = result;
        // data.loggedInUser = loggedInUser;
        data ={
            records:result,
            loggedInUser:loggedInUser
        }
        console.log(data);
        response.render("show-coach-lower-position.hbs", data);
    })
}

var deleteCoachLowerPosition = function (request, response) {
    var mongoId = request.query.id;
   

    DB.collection("coachLowerPosition").deleteOne({ _id: mongodb.ObjectID(mongoId) }, function (error, result) {
        if (error) {
            console.log(error);
            return;
        }
        var data = {
            msg: "Success",
            id: mongoId
        }

        response.send(JSON.stringify(data))

    })

}

var showAdminOption = function(request,response){
    
    var loggedInUser = request.session.user;
    var data ={
        isAdmin:loggedInUser.isAdmin
    }
    response.send(JSON.stringify(data));
}

exports.coachLowerPosition = coachLowerPosition;
exports.addCoachLowerPosition = addCoachLowerPosition;
exports.showCoachLowerPosition = showCoachLowerPosition;
exports.deleteCoachLowerPosition = deleteCoachLowerPosition;
exports.showAdminOption = showAdminOption;