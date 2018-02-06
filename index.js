var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.send('hello Elvis');
});

app.listen(8080, ()=> {
    console.log('Listening to Port 8080');
});