var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 3001;
var path = require('path');
var mongoose = require('mongoose');
var config = require('./config/database');
var cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var connection = mongoose.connect(config.database);

if(connection){
    console.log("DB Connected");
}
else{
    console.log("DB Error");
}

var eventRoute = require('./routes/eventRoute');

app.use(express.static(path.join(__dirname,"public")));

app.use('/event',eventRoute);

app.listen(port,function () {
    console.log("Push ya poison on port 3001");
});

app.get("/", function (req,res) {
   res.send("Hey ya!");
});