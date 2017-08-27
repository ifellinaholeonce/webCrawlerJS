var request = require("request");
var http = require("http");
var cheerio = require("cheerio");
var express = require("express");

var index=[];


function getLinks($){
	//CURRENTLY ADDING LINKS TO INDEX AS A COUNT NOT THE ACTUAL URL STRING.
	links = $('a');
	$(links).each(function(i, link){
		//console.log($(link).text() + ':\n ' + $(link).attr('href'));
		index.push($(link).attr('href'));
		console.log(index);
	});
}


function getBody(seed, callback){
	request(seed, function (error, response, body) {
		console.log('error:', error); // Print the error if one occurred 
		console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
		
		var $ = cheerio.load(body);
		getLinks($);
		//console.log("getLinks returns:" + index);
		callback(index);
	})
}


function crawl(index){
	console.log("Received crawl")
	//getBody needs the seed to be taken out of the array. Putting it inside a loop.
	if (index.length != 0){
		pageToVisit = index.pop();
		getBody(pageToVisit, crawl);
	} else {
		console.log("Empty Index:" + index);
	}
	return(index);

}


exports.index = function(seed){
	index.push(seed);
	crawl(index);

	return(index.toString());
}
































































// function getBody(index, callback){
// 	console.log("Received getBody")
// 	request(index, function (error, response, body) {
// 		console.log('error:', error); // Print the error if one occurred 
// 		console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
		
// 		var $ = cheerio.load(body);
// 		links = $('a');
// 		$(links).each(function(i, link){
// 		console.log($(link).text() + ':\n ' + $(link).attr('href'));
// 		})
// 		//getLinks(index, body)
// 	});
// }

// function getLinks(index, body){
// 	console.log("Received getLinks");
// 	var start_link;
// 	var end_link;
// 	var cutBody;
// 	var link = "";
	
// 	cutBody = body;

// 	//Get Links from Body
// 	for (i = 0; i < cutBody.length; i++){
// 		start_link = cutBody.indexOf('<a href="');
// 		cutBody = cutBody.slice(start_link+9, body.length);
// 		console.log("Slice Length: " + cutBody.length);
// 		end_link = cutBody.indexOf('"');
// 		console.log("End quote: " + end_link);
// 		link = cutBody.slice(0, end_link);
// 		console.log(link);
// 		index.push(link + "\n");
// 		console.log(index);
// 		if (cutBody.indexOf('<a href="') == -1){
// 			console.log("Finished!");
// 			return
// 			}
// 		}
// 	return
// }