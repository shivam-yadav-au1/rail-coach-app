var express = require('express');
var mongodb = require('mongodb');
var bodyParser = require('body-parser');
var bogiRecived = require("./routes/bogi-recived")
var bogiFitment = require("./routes/bogi-fitment-records")
var showRecords = require("./routes/show-records")


var app  = express();

app.set("view engine","hbs");

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(express.static("public"));
//Connection to DB
var DB;
var DB_URL = process.env.DB_URL || "mongodb://localhost:27017/rail";
console.log(DB_URL);
var mongoClient = new mongodb.MongoClient(DB_URL,{useNewUrlParser:true})
mongoClient.connect(function(error){
    if(error){
        console.log("Error:"+error);
        return;
    }
    console.log("Database Connected");
    DB = mongoClient.db("rail");
    app.locals.DB = DB;
});

app.get("/",function(request,response){
    response.render("index.hbs");
})

app.get("/bogiReceived",bogiRecived.bogiRecived);
app.get("/bogiFitment",bogiFitment.showBogiFitmentRecords);
app.get("/showRecords",showRecords.showRecords);
app.post("/bogiReceived",bogiRecived.addNewBogi);
app.post("/bogiFitment",bogiFitment.addBogiFitment);
app.post("/updateBogiStatus",bogiFitment.updateBogiStatus)

app.listen(process.env.PORT || 3000);

