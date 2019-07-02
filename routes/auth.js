var mongodb = require('mongodb');
var md5 = require('md5');
var DB;

var signupPage = function (request, response) {

    response.render("signup.hbs")
}

var signup = function (request, response) {


    var email = request.body.email;
    var employeeName = request.body.employeeName;
    var password = md5(request.body.password);

    var data = {
        email: email,
        employeeName: employeeName,
        password: password,
        isAdmin: false
    }
    console.log(data);
    DB = request.app.locals.DB;
    DB.collection("users").insertOne(data, function (error, result) {
        if (error) {
            console.log(error)
            return;
        } else {
            console.log("Data inserted Successfully")
            response.redirect("/login")
        }
    })
}

var loginPage = function (request, response) {

    var data = {}
    if (request.query.isLogin === "false") {
        data.isLogin = true;
    }
    console.log(data)
    response.render("login.hbs", data);
}

var login = function (request, response) {

    var email = request.body.email;
    var password = md5(request.body.password);

    var userDetails = {
        email: email,
        password: password
    }

    DB = request.app.locals.DB;
    DB.collection("users").findOne(userDetails, function (error, user) {
        if (error) {
            console.log(error);
            return;
        }
        else if (!user) {
            console.log("User not Found in Database ...")
            response.redirect("/login?isLogin=false");
        } else {
            request.session.user = user;
            response.redirect("/coachLowerPosition");
        }

    })


}

exports.signupPage = signupPage;
exports.signup = signup;
exports.loginPage = loginPage;
exports.login = login;
