//requires
var express = require("express");
var http = require("http");
var request = require("request");
var crawler = require("./crawler")

//variables
var app = express();
var port = 3000;

//Log requests to console
app.use('/',function(req, res, next){
	console.log('Request URL: ', req.originalUrl)
	next()
}, function(req, res, next){
	console.log('Request Type: ', req.method)
	next()
});

app.get("/", function(req, res){
	request('http://econpy.pythonanywhere.com/ex/001.html', function (error, response, body) {
	console.log('error:', error); // Print the error if one occurred 
	console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
	
	var count = crawler.counter(body);
	console.log(count);
	res.send(count);
});

});

http.createServer(app).listen(port, function(){
	console.log("app running on port" + port)
});