
var http = require('http').createServer(start).listen(8181);
var mime = require('mime');
var url  = require('url');
var qs 	 = require('querystring');
var jade = require('jade');

var numberDictionary = require('./numberDictionary');

//Web server startup.
function start(request, response) {
	var page = parsePage(url.parse(request.url).pathname);
	var responsePage = jade.renderFile(__dirname+'/../views' + page[0], page[1], function (err, html) {
		if (err){
	  		response.writeHead(500);
	  		//console.log(err);
			return response.end('Error loading page');
        }
		response.writeHead(200, {'Content-Type': 'text/html'});
		response.write(html);
		response.end();
	});
}

function parsePage(page){
	//console.log(page);
	var newPage = ['',{}];
	var regexp = /(\/\w*\/\d*$)|(\/\w*\/-\d*$)/g; // /word/number or /word/-number

	if (page == '' || page == '/'){
		newPage = ['/index.jade', {}];
	}
	else if (regexp.test(page)){
		newPage[0] = '/number.jade';
		var dict = {};
		dict.number = getNumber(page);
		dict.language = getLanguage(page);
		//console.log(dict.language, dict.number);
		dict.parsedNumber = getNumberInLanguage(dict.number, dict.language);
		newPage[1] = dict;
	}
	return newPage;
}

function getNumber(line){
	var len = line.length;
	var ret = '';

	var secondSlash = line.lastIndexOf('/');
	var ret = parseInt(line.substring(secondSlash+1, len));

	if (typeof(ret) == 'number'){
		return ret;
	}

	return 'error';
}

function getLanguage(line){
	var len = line.length;
	var ret = '';

	for (var i=1; i<len; i++){
		if (line[i] == '/'){
			return ret;
		}
		else if ( new RegExp(/[^\w]/g).test(line[i])){
			break;
		}
		else{
			ret += line[i];
		}
	}
	return 'error';
}

function getNumberInLanguage(number, language){
	return numberDictionary.parseNumberForLanguage(number,language);
}