var express = require('express'),
  numberDictionary = require('./numberDictionary'),
  errors = require('./errors');

var langCount = numberDictionary.numberOfSupportedLanguages(),
  languages = numberDictionary.supportedLanguages();

var singleNumberRegExp = /^-*\d+$/,
  numberRangeRegExp = /^-*(\d+)-+(\d+)$/;

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
  res.status(500).send(errors.invalidURL);
});

//Processing
function responseForSingleNumber(req){
  var language = req.params.language;
    number   = parseInt(req.params.number, 10);
    response = {
      'language': language,
      'number': number
    },
    parsedNumber = getNumberInLanguage(number, language);

  if (parsedNumber === errors.numberTooLarge || parsedNumber === errors.numberTooSmall){
    response['error'] = parsedNumber;
  }
  else{
    response['parsedNumber'] = parsedNumber;
  }
  return response;
}

function responseForNumberRange(req){
  var language = req.params.language,
    range  = parseRange(req.params.number.split("-")),
    start  = range[0],
    end    = range[1],
    errorMessage = checkRange(start, end, language);

  var res = {
    'language': language, 
    'range':start.toString() + ' to ' + end.toString(),    
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
  var parsedArray = [], 
    isNegative = false;
  for (var i=0; i < rangeArray.length && parsedArray.length < 2; i++){
    if (rangeArray[i] === ''){
      isNegative = !isNegative;
      continue;
    }

    if (isNegative){
      parsedArray.push(0-parseInt(rangeArray[i], 10));
    }
    else{
      parsedArray.push(parseInt(rangeArray[i], 10));
    }
    isNegative = false;
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
  var numbers = [],
    end = Math.min(end, Math.pow(10,15)+1);
  for (var i = start; i <= end; i++){
    numbers.push(getNumberInLanguage(i, language));
  }
  return numbers;
}

module.exports = app;