var express = require('express')
var app = express()
var client = require('redis').createClient()
const http = require('http');
const http2 = http.Server(app);
var limiter = require('express-limiter')(app, client)
var RateLimiter = require('request-rate-limiter');
var limiterReq = new RateLimiter(400);

limiter({
  path: '/api/action',
  method: 'get',
  lookup: ['connection.remoteAddress'],
  // 150 requests per hour
  total: 1,
  expire: 1000 * 60 * 60
}, function(err, response) {
    console.log(response);
    console.log(err);
})
 

app.get('/api/action', function (req, res) {
  res.status(200).send( 'ok')
});

app.get('/apitest', function (req, res) {
    res.status(200).send( 'ok')
});



http2.listen('4000', 'localhost', () => {
    console.log(`Listening on`);
});
