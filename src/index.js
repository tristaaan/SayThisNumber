import isNumber from '101/is-number';
import isString from '101/is-string';
import errors from './errors';
import languages from './languages';

var Parser = function(n) {
  if (isString(n)) {
    // this result has already been validated to not be NaN
    n = parseInt(n, 10);
  }
  this.n = n;
  this.languages = Object.keys(languages);
};

Parser.prototype.in = function(language) {
  if (!languages.hasOwnProperty(language)) {
    throw new Error(errors.unsupported);
  }
  if (Array.isArray(this.n)) {
    var ret = [];
    for (var i = 0; i < this.n.length; i++) {
      var n = this.n[i];
      ret.push(languages[language](n));
    }
    return ret;
  }
  return languages[language](this.n);
};

var validateNumber = function(n) {
  if (n > Math.pow(10, 15)) {
    throw new Error(errors.numberTooLarge);
  } else if (n < -Math.pow(10, 15)) {
    throw new Error(errors.numberTooSmall);
  }

  if (n === null || n === undefined) {
    throw new Error(errors.noNumber);
  } else if (isNaN(n)) {
    throw new Error(errors.invalidNumber);
  }

  if (isString(n)) {
    n = parseInt(n, 10);
    if (isNaN(n)) {
      throw new Error(errors.invalidNumber);
    }
  }
  if (!isNumber(n)) {
    throw new Error(errors.invalidNumber);
  }
};

export default function sayThisNumber(n) {
  validateNumber(n);
  return new Parser(n);
};

export function sayTheseNumbers(arr) {
  if (arguments.length === 0) {
    throw new Error(errors.noNumber);
  }
  if (!Array.isArray(arr)) {
    var _arr = [];
    for (var i = 0; i < arguments.length; i++) {
      _arr[i] = arguments[i];
    }
    arr = _arr;
  }
  arr.forEach(function(n) { validateNumber(n); });
  return new Parser(arr);
};

export function sayThisNumberRange(fromN, toN) {
  var reverse = false;
  validateNumber(fromN);
  validateNumber(toN);
  if (fromN > toN) {
    reverse = true;
    var tmp = fromN;
    fromN = toN;
    toN = tmp;
  }
  var arr = [];
  for (var i = fromN; i <= toN; i++) {
    arr.push(i);
  }
  if (reverse) {
    arr = arr.reverse();
  }
  return sayTheseNumbers(arr);
};
