var config =require('./config.js');
var youtube = require('./youtube');
var youTubeclient = new youtube.Client(config.youTube);

var http = require('http');
var express = require('express');
var path = require('path');
var app = express();
var routes = require('./routes/index');

app.set('port', process.env.PORT || 6500);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower',express.static(path.join(__dirname, 'bower_components')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.get("/search",function(req,res){
  var term = req.query['q'];
  youTubeclient.search(term,function(data){
    res.json(data);
    res.end();
  });
});

// app.use('/', views);
app.use('/',routes);
app.get('/', function(req, res) {
  res.send('hello world');
});

app.get('/users', function(req, res) {
  var user = [{
    name: 'bob smith',
    age: 35},
    {
      name: 'eunice park',
      age: 5
    }
  ];
  res.json(user);
});



var server = app.listen(app.get('port'), function() {
  console.log('Server started on port ' + server.address().port);
});

