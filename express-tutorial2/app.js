var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false });

//var logger = require('./logger.js');
//app.use(logger);

//var only_get = require('./only_get.js');
//app.use(only_get);

var cities = {
  'Lotopia': 'Rough and mountainous',
  'Caspiana': 'Sky-top island',
  'Indigo': 'Vibrant and thriving',
  'Paradise': 'Lush, green plantation',
  'Flotilla': 'Bustling urban oasis'
};

app.param('name', function(request, response, next){
  request.cityName = parseCityName(request.params.name);
  next();
});

app.get('/cities/:name', function (request, response) {
  var cityInfo = cities[request.cityName];
  if(cityInfo) {
    response.json(cityInfo);
  } else {
    response.status(404).json("City not found");
  }
});

function parseCityName(name){
  var parsedName = name[0].toUpperCase() + name.slice(1).toLowerCase();
  return parsedName;
}

app.use(express.static('public'));

app.get('/cities', function(req, res){
  res.json(Object.keys(cities));
});

// EDIT
app.post('/cities', parseUrlencoded, function (request, response) {
  if(request.body.description.length > 4){
    var city = createCity(request.body.name, request.body.description);
    response.status(201).json(city);
  }else{
    response.status(400).json("Invalid City");
  }
});

// ADD
app.delete('/cities/:name', function(request, response){
  if(cities[request.cityName]){
    delete cities[request.cityName];
    response.sendStatus(200);
  }else{
    response.sendStatus(404);
  }
});

app.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});

var createCity = function(name, description){
  cities[name] = description;
  return name; 
};





