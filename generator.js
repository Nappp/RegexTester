
var fs = require('fs');
var COUNT = 5000000;
var protocols = ["", "http://", "https://", "ftp://"];
var port = ["", ":80", ":443", ":21", ":8080"];
var topdomain = [".com", ".com.cn", ".com.hk", ".hk", ".net"];
var chars = "abcdefghijklmnopqrstuvwxyz0123456789-";

var rand = function(downer, upper){
	if(arguments.length === 1){
		upper = downer;
		downer = 0;
	}
	return Math.floor( Math.random() * (upper - downer) + downer );
};

var randStr = function(downer, upper){
	if(arguments.length === 1){
		upper = downer;
		downer = 0;
	}
	var length = rand(downer, upper), strlen = chars.length;
	var result = "";
	while(length--){
		result += chars[rand(strlen)];
	}
	return result;
};

var createHost = function(){
	return randStr(3, 10) + topdomain[rand(topdomain.length)];
};

var createPath = function(){
	var length = rand(4), result = "";
	while(length--){
		result += ("/" + randStr(4, 6));
	}
	return result;
};

var createQuery = function(){
	var length = rand(4), result = length>0?"?":"";
	while(length--){
		result += ( randStr(4, 6) + "=" + randStr(4, 6) + (length>0?"&":"") );
	}
	return result;
};

var createHash = function(){
	var result = randStr(5);
	return ( (result.length>0?"#":"") + result );
};

var createRecord = function(){
	return protocols[rand(protocols.length)] + createHost() + createPath() + createQuery() + createHash();

};

var file = fs.createWriteStream('records.txt');
for(var i=0; i<COUNT; i++){
	file.write(createRecord() + "\n", 'utf-8', (err) => {
		if(err) throw err;
	});
}
file.end();
file.on('finish', (err) => {
	if(err) console.error(err);
	console.log('Write finished');
});

