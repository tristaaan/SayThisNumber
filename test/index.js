var assert = require('assert');
var errors = require('./errors');
var stn = require('../dist/saythisnumber.js');

var sayThisNumber = stn.default;
var sayTheseNumbers = stn.sayTheseNumbers;
var sayThisNumberRange = stn.sayThisNumberRange;

/* global describe it */

describe('Basic tests', function() {
  it('returns a natural language number', function() {
    assert.equal(sayThisNumber(42).in('english'), 'forty two');
    assert.equal(sayThisNumber(-42).in('english'), 'negative forty two');
  });
  it('can take strings', function() {
    assert.equal(sayThisNumber('16').in('english'), 'sixteen');
  });
  it('can take multiple numbers', function() {
    assert.deepEqual(sayTheseNumbers([16, 32, 64]).in('english'), ['sixteen', 'thirty two', 'sixty four']);
    assert.deepEqual(sayTheseNumbers([16, 32, '64']).in('english'), ['sixteen', 'thirty two', 'sixty four']);
    assert.deepEqual(sayTheseNumbers(2, 6, 4).in('english'), ['two', 'six', 'four']);
    assert.deepEqual(sayTheseNumbers(2, '6', 4).in('english'), ['two', 'six', 'four']);
  });
  it('returns a range of numbers', function() {
    assert.deepEqual(sayThisNumberRange(1, 5).in('english'), ['one', 'two', 'three', 'four', 'five']);
    assert.deepEqual(sayThisNumberRange(5, 1).in('english'), ['five', 'four', 'three', 'two', 'one']);
  });
});

function errorRegex(err) {
  return RegExp('^Error: ' + err + '$');
}

describe('Error tests', function() {
  it('should report language unsupported', function() {
    assert.throws(function() { sayThisNumber(42).in('flinglish'); }, errorRegex(errors.unsupported));
    assert.throws(function() { sayThisNumber(43).in('rongorongo'); }, errorRegex(errors.unsupported));
  });
  it('should report number too large', function() {
    assert.throws(function() { sayThisNumber(Math.pow(10, 15) + 2).in('english'); }, errorRegex(errors.numberTooLarge));
    assert.throws(function() { sayThisNumber(Math.pow(10, 16)).in('english'); }, errorRegex(errors.numberTooLarge));
  });
  it('should report number too small', function() {
    assert.throws(function() { sayThisNumber(-Math.pow(10, 15) - 2).in('english'); }, errorRegex(errors.numberTooSmall));
    assert.throws(function() { sayThisNumber(-Math.pow(10, 16)).in('english'); }, errorRegex(errors.numberTooSmall));
  });
  it('should report invalid number', function() {
    assert.throws(function() { sayThisNumber(NaN).in('english'); }, errorRegex(errors.invalidNumber));
    assert.throws(function() { sayThisNumber('s90').in('english'); }, errorRegex(errors.invalidNumber));
  });
  it('should report no number', function() {
    assert.throws(function() { sayThisNumber().in('english'); }, errorRegex(errors.noNumber));
    assert.throws(function() { sayTheseNumbers().in('english'); }, errorRegex(errors.noNumber));
    assert.throws(function() { sayThisNumber(null).in('english'); }, errorRegex(errors.noNumber));
    assert.throws(function() { sayThisNumber(undefined).in('english'); }, errorRegex(errors.noNumber));
  });
});

describe('Sanity tests', function() {
  var langs = sayThisNumber(50).languages;
  it('should return a list of languages', function() {
    assert.equal(langs.length, 20);
  });
  it('should say a 21', function() {
    for (var i = 0; i < langs.length; i++) {
      var l = langs[i];
      assert.doesNotThrow(function() {
        sayThisNumber(21).in(l);
      });
    }
  });
  it('should say a 467', function() {
    for (var i = 0; i < langs.length; i++) {
      var l = langs[i];
      assert.doesNotThrow(function() {
        sayThisNumber(467).in(l);
      });
    }
  });
  it('should say a 8732', function() {
    for (var i = 0; i < langs.length; i++) {
      var l = langs[i];
      assert.doesNotThrow(function() {
        sayThisNumber(8732).in(l);
      });
    }
  });
});
