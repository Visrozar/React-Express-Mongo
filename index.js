var express = require('express');
const router = express.Router();
var app = express();
const mongoose = require('mongoose');
const config = require('./config/database');
const users = require('./routes/users')(router);
const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err)=> {
    if (err) {
        console.log("Could not connect to Database", err);
    } else {
        console.log("Connected to Database");
    }
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false}))

//parse application/json
app.use(bodyParser.json());

app.use('/users', users);

app.get('/', function(req, res){
  res.send('hello Elvis');
});

app.listen(8080, ()=> {
    console.log('Listening to Port 8080');
});