var request = require("request");
var http = require("http");

function getLinks(index, body){
	console.log("Received getLinks");
	var start_link;
	var end_link;
	var cutBody = body;
	var link = "";
	for (i = 0; i < cutBody.length; i++){
		start_link = cutBody.indexOf('<a href="');
		cutBody = cutBody.slice(start_link+9, body.length);
		//console.log(slice);
		console.log("Slice Length: " + cutBody.length);
		end_link = cutBody.indexOf('"');
		console.log("End quote: " + end_link);
		link = cutBody.slice(0, end_link);
		console.log(link);
		index.push(link + "\n");
		console.log(index);
		if (cutBody.indexOf('<a href="') == -1){
			console.log("Finished!");
			return
			}
		}
	return
}

// function getBody(seed, body){
// 	http.get(seed, function(body){
// 		return(body);
// 	}).on('error', function(e){
// 		console.log("Got error: " + e.message);
// 	});
// }

function getNextPage(index){
	console.log("Received getNextPage")
	for (e in index){
		request(index[e], function (error, response, body) {
			console.log('error:', error); // Print the error if one occurred 
			console.log('statusCode:', response && response.statusCode);
			console.log("getLinks");
			getLinks(index, body);
			console.log("BACK TO getNextPage")
		});
		console.log("Does it get here?")
	}
	console.log("Finished getNextPage")
	return
}

exports.crawl = function(seed, body){
	console.log("Received Body");
	console.log(body.length);
	var index = [seed];

	//getBody(seed,body);
	//console.log("Returned from getBody")
	getLinks(index, body);
	// console.log("INDEX:")
	// console.log(index);
	// console.log("---------------")
	//console.log("Body is " + body);
	return(index.toString());
}