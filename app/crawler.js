exports.counter = function(body){
	console.log("Received Body");
	console.log(body.length);
	var count = body.length;
	count = count.toString();
	return count;
} 