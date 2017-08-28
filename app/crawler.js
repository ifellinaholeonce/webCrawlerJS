var request = require("request");
var http = require("http");
var cheerio = require("cheerio");
var express = require("express");

var index=[];
var pagesCrawled = []
var maxCrawl = 5;
var currentCrawl = 0;


function getLinks($){
	//pagesCrawled.push(seed);
	//console.log("Pushing to pagesCrawled: " + seed)
	//CURRENTLY ADDING LINKS TO INDEX AS A COUNT NOT THE ACTUAL URL STRING.
	links = $('a');
	$(links).each(function(i, link){
		//console.log($(link).text() + ':\n ' + $(link).attr('href'));
		if (!index.includes($(link).attr('href')) && !pagesCrawled.includes($(link).attr('href'))) {
			index.push($(link).attr('href'));
		}
		//console.log(index);
	});
}


function getBody(seed, callback){
	pagesCrawled.push(seed);
	console.log("Requesting page:" + seed);
	 // if (pagesCrawled.includes(seed)){
	 // 	console.log("Already crawled:" + seed);
	 // 	console.log("Already crawled pagesCrawled: " + pagesCrawled)
	 // 	callback(index);
	 // }
	request(seed, function (error, response, body) {
		console.log('error:', error); // Print the error if one occurred 
		console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
		
		var $ = cheerio.load(body);
		getLinks($);
		//console.log("getLinks returns:" + index);
		callback();
	});
}


function crawl(){
	console.log("Pages Crawled: " + pagesCrawled);
	//console.log("Received crawl")
	//getBody needs the seed to be taken out of the array. Putting it inside a loop.
	if (index.length > 0){
		pageToCrawl = index.pop();
		//Check to see if page has already been crawled
		if (pageToCrawl in pagesCrawled){
			crawl();
		} else {
			currentCrawl++;
			getBody(pageToCrawl, crawl)
		}
	} else {
		console.log("Index is empty");
	}
		// if (currentCrawl < maxCrawl){
		// 	currentCrawl++;
		// 	getBody(pageToCrawl, crawl);
		// } else if (currentCrawl == maxCrawl) {
		// 	return(pagesCrawled)
		// }
	//}
	// else {
	// 	console.log("Empty Index:" + index);
	// 	return(pagesCrawled);
	// }
	//return(pagesCrawled);

}


exports.start = function (seed){
//var seed = 'http://econpy.pythonanywhere.com/ex/001.html'
// const promise = new Promise((resolve, reject) =>{
	index.push(seed)
	crawl();
 	//setTimeout(function(){
 	/*	resolve();
//  	}, 2000);	
//  });

// promise.then(() => { 
// console.log("Returned to start")	
// return(pagesCrawled);
// });*/
}


exports.finalPagesCrawled = function(){
	return(pagesCrawled.toString())
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