import errors from './errors.js';
import languages from './languages';

var parser = function(n) {
  this.n = n;
};

parser.prototype.in = function(language) {
  if (!languages.hasOwnProperty(language)){
    throw new Error(errors.unsupported);
  }
  if (Array.isArray(this.n)) {
    var ret = [];
    for (var i=0; i < this.n.length; i++) {
      ret.push(languages[language](this.n));
    }
    return ret;
  }
  return languages[language](this.n);
};

var test_thresholds = function(n) {
  if (n > Math.pow(10, 15)){
    throw new Error(errors.numberTooLarge);
  }
  else if (n < -Math.pow(10, 15)){
    throw new Error(errors.numberTooSmall);
  }
};

export default function sayThisNumber(n) {
  test_thresholds(n);
  return new parser(n);
};

export function sayTheseNumbers(arr) {
  arr.forEach(function(n) { test_thresholds(n); });
  return new parser(n);
};

export function sayNumberRange(from_n, to_n) {
  var reverse = false;
  test_thresholds(from_n);
  test_thresholds(to_n);
  if (from_n > to_n) {
    reverse = true;
    var tmp = from_n;
    from_n = to_n;
    to_n = tmp;
  }
  var arr = [];
  for (var i=from_n; i <= to_n; i++) {
    arr.push(i);
  }
  return sayTheseNumbers(arr);
};
