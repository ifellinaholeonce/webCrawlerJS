exports.counter = function(body){
	console.log("Received Body");
	console.log(body.length);
	var start_link;
	var end_link;
	var cutBody = body;
	var link = "";
	var linksArray = [];


	for (i = 0; i < cutBody.length; i++){
		start_link = cutBody.indexOf('<a href="');
		cutBody = cutBody.slice(start_link+9, body.length);
		//console.log(slice);
		//console.log("Slice Length: " + cutBody.length);
		end_link = cutBody.indexOf('"');
		//console.log("End quote: " + end_link);
		link = cutBody.slice(0, end_link);
		//console.log(link);
		linksArray.push(link + "\n");
		//console.log(linksArray);
		if (cutBody.indexOf('<a href="') == -1){
			console.log("Finished!");
			return(linksArray.toString());
		}
	}

	return(linksArray.toString());
}