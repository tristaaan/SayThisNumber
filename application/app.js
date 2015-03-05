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

//From express documentation
app.param(function(name, fn){
    if (fn instanceof RegExp) {
        return function(req, res, next, val){
            var captures;
            if (captures = fn.exec(String(val))) {
                req.params[name] = captures;
                next();
            } 
            else {
                next('route');
            }
        }
    }
});

app.param('language', /^\w+$/); //some word
app.param('number', /^-*\d+$/); //(negative) some number
app.param('range', /^-*(\d+)-+(\d+)$/); //(negative?) some number - (negative?) some number

//GET responses
//home page
app.get('/', function(req, res){
    res.render('index.jade', {'languageCount': langCount, 'languages': languages});
});

//single number
app.get('/:language/:number', function(req, res){
    res.render('number.jade', responseForSingleNumber(req));
});

//number range
app.get('/:language/:range', function(req, res){
    res.render('number-range.jade', responseForNumberRange(req));
});

//POSTS responses for API
//post to index returns error
app.post('/', function(req, res){
    res.send({
        'error': 'usage: `curl [address]/[language]/[number]`'
    }); 
});

//single number
app.post('/:language/:number', function(req, res){
    res.send(responseForSingleNumber(req));
});

//number range
app.post('/:language/:range', function(req, res){
    res.send(responseForNumberRange(req))
});

//Processing
function responseForSingleNumber(req){
    var language = req.params.language[0];
    var number = parseInt(req.params.number[0]);
    return {
        'language': language,
        'number': number,
        'parsedNumber': getNumberInLanguage(number, language)
    };
}

function responseForNumberRange(req){
    var language = req.params.language[0];
    var range = parseRange(req.params.range[0].split("-"));
    var start  = range[0];
    var end = range[1];
    var errorMessage = checkRange(start, end, language);

    var res = {
        'language': language, 
        'range':start.toString() + " to " + end.toString(),    
    }
    if (errorMessage.length === 0){
        res['parsedNumbers'] = getNumbersInRangeOfLanguage(start,end,language)
    }
    else{
        res['error'] = errorMessage
    }

    return res;
}

function getNumberInLanguage(number, language){
	return numberDictionary.parseNumberForLanguage(number,language);
}

// ["", "5", "10"] => [-5,10]
// ["", "", 5, "", "", 10]; => [5,10]
function parseRange(rangeArray){
    var parsedArray = [];
    var isNegative = false;
    for (var i=0; i<rangeArray.length && parsedArray.length < 2; i++){
        if (rangeArray[i] === ''){
            isNegative = !isNegative;
            continue;
        }

        if (isNegative){
            parsedArray.push(0-parseInt(rangeArray[i]));
        }
        else{
            parsedArray.push(parseInt(rangeArray[i]));
        }
        isNegative = false
    }
    return parsedArray;
}

function checkRange(start, end, language){
    if (Math.abs(end-start) > 5000){
        return 'range is too large';
    }
    else if (start > Math.pow(10,15)){
        return 'start of range is too large';
    }
    else if (start < -Math.pow(10,15)){
        return 'start of range is too small';
    }
    else if (start >= end){
        return 'range is too small or reversed';
    }
    else if (!numberDictionary.hasLanguage(language)){
        return 'language unsupported';
    }
    return "";
}

function getNumbersInRangeOfLanguage(start, end, language){
    var numbers = []
    end = Math.min(end, Math.pow(10,15)+1);
    for (var i=start; i<=end; i++){
        numbers.push(getNumberInLanguage(i, language));
    }
    return numbers;
}

module.exports = app;