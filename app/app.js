//requires
var express = require("express");
var http = require("http");
var request = require("request");
var crawler = require("./crawler")

//variables
var app = express();
var port = 3000;
//var index = [];

app.get("/", function(req, res){
	var seed = "http://econpy.pythonanywhere.com/ex/001.html";
	//index.push(seed);
	var results = "Hello";
	console.log("Initial results: " + results)
	const promise = new Promise((resolve, reject) =>{
		//for (e in index) {
		crawler.start(seed);
		//}
		setTimeout(function(){
			resolve();
		}, 2500);
	});
	promise.then(() => {
	results = crawler.finalPagesCrawled();
	res.send(results)
	});
});

http.createServer(app).listen(port, function(){
	console.log("app running on port" + port)
});



// http://econpy.pythonanywhere.com/ex/001.html
// http://titan.dcs.bbk.ac.uk/~kikpef01/testpage.html