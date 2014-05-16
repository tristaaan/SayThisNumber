
var http = require('http').createServer(start).listen(8181);
var mime = require('mime');
var url  = require('url');
var qs 	 = require('querystring');
var jade = require('jade');

var numberDictionary = require('./numberDictionary');

var langCount = numberDictionary.numberOfSupportedLanguages();
var languages = numberDictionary.supportedLanguages();

//Web server startup.
function start(request, response) {
	var isCurl = false;
	if (typeof(request.headers['user-agent']) == 'string' && 
		request.headers['user-agent'].length > 4){
		isCurl = request.headers['user-agent'].substring(0,4).toLowerCase() == 'curl';
	}
	var page = parsePage(url.parse(request.url).pathname, isCurl);

	if (!isCurl){
		var responsePage = jade.renderFile(__dirname+'/../views' + page[0], page[1], function (err, html) {
			if (err){
		  		response.writeHead(500);
		  		console.log(err);
				return response.end('Error loading page');
	        }
			response.writeHead(200, {'Content-Type': 'text/html'});
			response.write(html);
			response.end();
		});
	}
	else{
		response.writeHead(200, {'Content-Type': 'application/json'});
		response.write(JSON.stringify(page));
		response.end();
	}

}

function parsePage(page, isCurl){
	//console.log(page);
	var newPage = ['',{}];
	var regexp = /(\/\w*\/\d*$)|(\/\w*\/-\d*$)/g; // /word/number or /word/-number

	if (!isCurl){
		if (page == '' || page == '/'){
			newPage = ['/index.jade', {'languageCount': langCount, 'languages': languages}];
		}
		else if (regexp.test(page)){
			newPage[0] = '/number.jade';
			var dict = {};
			dict.number = getNumber(page);
			dict.language = getLanguage(page);
			dict.parsedNumber = getNumberInLanguage(dict.number, dict.language);
			newPage[1] = dict;
		}
	}
	else{		
		if (regexp.test(page)){
			var dict = {};
			dict.number = getNumber(page);
			dict.language = getLanguage(page);
			dict.parsedNumber = getNumberInLanguage(dict.number, dict.language);
			if (dict.number != 'error' && dict.language != 'error'){
				newPage = dict;
			}
		}
		else{
			newPage = {'error': 'usage: `curl [address]/[language]/[number]`'};
		}
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
