var express = require('express');
const router = express.Router();
var app = express();
const mongoose = require('mongoose');
const config = require('./config/database');
const users = require('./routes/users')(router);
const bodyParser = require('body-parser');
const path = require('path');
const port = process.env.PORT || 8080;

mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err)=> {
    if (err) {
        console.log("Could not connect to Database", err);
    } else {
        console.log("Connected to Database");
    }
});

// serve the react app files
app.use(express.static(`${__dirname}/client/build`));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false}))

//parse application/json
app.use(bodyParser.json());

// app.use(express.static('uploads'));
app.use('/uploads', express.static('uploads'))

app.use('/users', users);

// app.get('/', function(req, res){
//   res.send('hello Elvis');
// });

app.listen(port, ()=> {
    console.log('Listening to Port 8080');
});