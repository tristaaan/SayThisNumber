'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var errors = {
  invalidNumber : 'invalid number',
  noNumber      : 'no number provided',
  unsupported   : 'language unsupported',
  rangeTooLarge : 'range is too large',
  startTooSmall : 'start of range is too small',
  startTooLarge : 'start of range is too large',
  invalidRange  : 'range is too small or reversed',
  numberTooSmall: 'number too small',
  numberTooLarge: 'number too large'
}

var languages = {
  chineseSimplified:    require('./parsers/chineseNumeralsSimplifiedNumberParser'),
  chineseTraditional:   require('./parsers/chineseNumeralsTraditionalNumberParser'),
  chinesePinyin:        require('./parsers/chinesePinyinNumberParser'),
  czech:                require('./parsers/czechNumberParser'),
  dutch:                require('./parsers/dutchNumberParser'),
  emoji:                require('./parsers/keycapEmojiParser'),
  english:              require('./parsers/englishNumberParser'),
  estonian:             require('./parsers/estonianNumberParser'),
  french:               require('./parsers/frenchNumberParser'),
  german:               require('./parsers/germanNumberParser'),
  icelandic:            require('./parsers/icelandicNumberParser'),
  italian:              require('./parsers/italianNumberParser'),
  japaneseHiragana:     require('./parsers/japaneseHiraganaNumberParser'),
  japaneseKanji:        require('./parsers/japaneseKanjiNumberParser'),
  japaneseRomaji:       require('./parsers/japaneseRomajiNumberParser'),
  norwegian:            require('./parsers/norwegianNumberParser'),
  portuguese:           require('./parsers/portugueseNumberParser'),
  russian:              require('./parsers/russianNumberParser'),
  spanish:              require('./parsers/spanishNumberParser'),
  swedish:              require('./parsers/swedishNumberParser')
};

var parser = function(n) {
  this.n = n;
};

parser.prototype.in = function(language) {
  if (languages.hasOwnProperty(language)){
    throw new Error(errors.unsupported);
  }
  if (Array.isArray(this.n)) {
    var ret = [];
    for (var i=0; i < this.n.length; i++) {
      ret.push(languages[language].parseNumber(this.n));
    }
    return ret;
  }
  return languages[language].parseNumber(this.n);
};

var test_thresholds = function(n) {
  if (n > Math.pow(10, 15)){
    throw new Error(errors.numberTooLarge);
  }
  else if (n < -Math.pow(10, 15)){
    throw new Error(errors.numberTooSmall);
  }
};

function sayThisNumber(n) {
  test_thresholds(n);
  return new parser(n);
}
function sayTheseNumbers(arr) {
  arr.forEach(function(n) { test_thresholds(n); });
  return new parser(n);
}
function sayNumberRange(from_n, to_n) {
  test_thresholds(from_n);
  test_thresholds(to_n);
  if (from_n > to_n) {
    var tmp = from_n;
    from_n = to_n;
    to_n = tmp;
  }
  var arr = [];
  for (var i=from_n; i <= to_n; i++) {
    arr.push(i);
  }
  return sayTheseNumbers(arr);
}

exports.default = sayThisNumber;
exports.sayTheseNumbers = sayTheseNumbers;
exports.sayNumberRange = sayNumberRange;
