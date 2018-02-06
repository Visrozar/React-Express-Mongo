var express = require('express');
var app = express();
const mongoose = require('mongoose');
const config = require('./config/database');

mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err)=> {
    if (err) {
        console.log("Could not connect to Database", err);
    } else {
        console.log("Connected to Database");
    }
});

app.get('/', function(req, res){
  res.send('hello Elvis');
});

app.listen(8080, ()=> {
    console.log('Listening to Port 8080');
});