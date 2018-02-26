var express = require('express');
var app = express();
var housesJson = require('./houses.json');

app.set('port', (process.env.PORT || 5000));

app.get('/', function (request, response) {  
  response.setHeader('Content-Type', 'application/json');
  response.send({'message':'It works!'});  
});

app.get('/houses', function (request, response) {
  var houses = [];
  var location = (request.query.location === undefined) ? "" : request.query.location;
  var locationField = "Location__c";

  for (var i = 0; i < housesJson.length; i++) {
    var tempLocation = housesJson[i][locationField].toLowerCase();

    if (tempLocation == location.toLowerCase()) {
      houses.push(housesJson[i]);
    }
  }
  response.setHeader('Content-Type', 'application/json');
  response.send(houses);
});

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});