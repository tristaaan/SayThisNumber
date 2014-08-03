var express = require('express');
var numberDictionary = require('./numberDictionary');

var langCount = numberDictionary.numberOfSupportedLanguages();
var languages = numberDictionary.supportedLanguages();

// Configuration
var app = express();

app.configure( function() {
    app.set('view engine', 'jade');
    app.set('views', __dirname + '/../views');
});

app.get('/', function(req, res){
    res.render('index.jade', {'languageCount': langCount, 'languages': languages});
});

app.get('/:language/:number', function(req, res){
    var language = req.params.language;
    var number = parseInt(req.params.number);
    res.render('number.jade', {
        'language':req.params.language, 
        'number':req.params.number, 
        'parsedNumber': getNumberInLanguage(number, language)
    });
});

app.post('/', function(req, res){
    res.send({
        'error': 'usage: `curl [address]/[language]/[number]`'
    }); 
});

app.post('/:language/:number', function(req, res){
    var language = req.params.language;
    var number = parseInt(req.params.number);
    res.send({
        'language':req.params.language, 
        'number':req.params.number, 
        'parsedNumber': getNumberInLanguage(number, language)
    });
});

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

function getNumberInLanguage(number, language){
	return numberDictionary.parseNumberForLanguage(number,language);
}

module.exports = app;