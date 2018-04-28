import errors from './errors';
import languages from './languages';

var Parser = function(n) {
  this.n = n;
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

var testThresholds = function(n) {
  if (n > Math.pow(10, 15)) {
    throw new Error(errors.numberTooLarge);
  } else if (n < -Math.pow(10, 15)) {
    throw new Error(errors.numberTooSmall);
  }
};

export default function sayThisNumber(n) {
  testThresholds(n);
  return new Parser(n);
};

export function sayTheseNumbers(arr) {
  arr.forEach(function(n) { testThresholds(n); });
  return new Parser(arr);
};

export function sayNumberRange(fromN, toN) {
  var reverse = false;
  testThresholds(fromN);
  testThresholds(toN);
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
