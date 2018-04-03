var http = require('http');
var express = require('express');
var router = express.Router();
var app = express();
var server = http.Server(app);
var bodyParser= require('body-parser');


var port = process.env.PORT || 8080;


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const asyncMiddleware = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next);
  };

app.get('/', asyncMiddleware(async (req, res, next) => {
  res.send('Hello World!');
}));

app.get('/api/sicom/store', asyncMiddleware(async (req, res, next) => {
  const storeData = await getStoreCode(req.query.storeId);
  res.json(storeData);
}));

var getStoreCode = function(storeId){
  return Math.floor((Math.random()) * 9000);
}


// Serve your app
console.log('Served: http://localhost:' + port);
// The server should start listening
server.listen(port);