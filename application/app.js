var express = require('express');
var numberDictionary = require('./numberDictionary');
var errors = require('./errors');

var langCount = numberDictionary.numberOfSupportedLanguages();
var languages = numberDictionary.supportedLanguages();

var singleNumberRegExp = /^-*\d+$/;
var numberRangeRegExp = /^-*(\d+)-+(\d+)$/;

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/../views');

//GET responses
//home page
app.route('/')
    .get(function(req, res){
        res.render('index.jade', {'languageCount': langCount, 'languages': languages});
    })
    .post(function(req, res){
        res.send({
            'error': errors.usageError
        }); 
    });

//just a language
app.route('/:language')
    .get(function(req, res){
        res.render('number.jade', {
            language: req.params.language,
            number: 'none',
            parsedNumber: errors.noNumber
        });
    })
    .post(function(req, res){
        res.send({
            'error': errors.usageError
        }); 
    });

app.route('/:language/:number')
    .get( function(req, res){
        if (singleNumberRegExp.test(req.params.number)){
            res.render('number.jade', responseForSingleNumber(req));
        }
        else if (numberRangeRegExp.test(req.params.number)){
            res.render('number-range.jade', responseForNumberRange(req));
        }
        else{
            res.render('number.jade', {
                language: req.params.language,
                number: 'none',
                parsedNumber: errors.invalidNumber
            });
        }
    })
    .post( function(req,res){
        if (singleNumberRegExp.test(req.params.number)){
            res.send(responseForSingleNumber(req));
        }
        else if (numberRangeRegExp.test(req.params.number)){
            res.send(responseForNumberRange(req));
        }
        else{
            res.send({'error': errors.invalidNumber});
        }
    });

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send(errors.invalidURL);
});

//Processing
function responseForSingleNumber(req){
    var language = req.params.language;
    var number = parseInt(req.params.number);
    return {
        'language': language,
        'number': number,
        'parsedNumber': getNumberInLanguage(number, language)
    };
}

function responseForNumberRange(req){
    var language = req.params.language;
    var range = parseRange(req.params.number.split("-"));
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
        return errors.rangeTooLarge;
    }
    else if (start > Math.pow(10,15)){
        return errors.startTooLarge;
    }
    else if (start < -Math.pow(10,15)){
        return errors.startTooSmall;
    }
    else if (start >= end){
        return errors.invalidRange;
    }
    else if (!numberDictionary.hasLanguage(language)){
        return errors.unsupported;
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