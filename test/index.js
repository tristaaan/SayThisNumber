var assert = require('assert');
var errors = require('./errors');
var say = require('../dist/saythisnumber.js');

/* global describe it */

describe('Basic tests', function() {
  it('returns a natural language number', function() {
    assert.equal(say.thisNumber(42).in('english'), 'forty two');
    assert.equal(say.thisNumber(-42).in('english'), 'negative forty two');
  });
  it('can take strings', function() {
    assert.equal(say.thisNumber('16').in('english'), 'sixteen');
  });
  it('can take multiple numbers', function() {
    assert.deepEqual(say.theseNumbers([16, 32, 64]).in('english'), ['sixteen', 'thirty two', 'sixty four']);
    assert.deepEqual(say.theseNumbers([16, 32, '64']).in('english'), ['sixteen', 'thirty two', 'sixty four']);
    assert.deepEqual(say.theseNumbers(2, 6, 4).in('english'), ['two', 'six', 'four']);
    assert.deepEqual(say.theseNumbers(2, '6', 4).in('english'), ['two', 'six', 'four']);
  });
  it('returns a range of numbers', function() {
    assert.deepEqual(say.thisNumberRange(1, 5).in('english'), ['one', 'two', 'three', 'four', 'five']);
    assert.deepEqual(say.thisNumberRange(5, 1).in('english'), ['five', 'four', 'three', 'two', 'one']);
  });
});

function errorRegex(err) {
  return RegExp('^Error: ' + err + '$');
}

describe('Error tests', function() {
  it('should report language unsupported', function() {
    assert.throws(function() { say.thisNumber(42).in('flinglish'); }, errorRegex(errors.unsupported));
    assert.throws(function() { say.thisNumber(43).in('rongorongo'); }, errorRegex(errors.unsupported));
  });
  it('should report number too large', function() {
    assert.throws(function() { say.thisNumber(Math.pow(10, 15) + 2).in('english'); }, errorRegex(errors.numberTooLarge));
    assert.throws(function() { say.thisNumber(Math.pow(10, 16)).in('english'); }, errorRegex(errors.numberTooLarge));
  });
  it('should report number too small', function() {
    assert.throws(function() { say.thisNumber(-Math.pow(10, 15) - 2).in('english'); }, errorRegex(errors.numberTooSmall));
    assert.throws(function() { say.thisNumber(-Math.pow(10, 16)).in('english'); }, errorRegex(errors.numberTooSmall));
  });
  it('should report invalid number', function() {
    assert.throws(function() { say.thisNumber(NaN).in('english'); }, errorRegex(errors.invalidNumber));
    assert.throws(function() { say.thisNumber('s90').in('english'); }, errorRegex(errors.invalidNumber));
  });
  it('should report no number', function() {
    assert.throws(function() { say.thisNumber().in('english'); }, errorRegex(errors.noNumber));
    assert.throws(function() { say.theseNumbers().in('english'); }, errorRegex(errors.noNumber));
    assert.throws(function() { say.thisNumber(null).in('english'); }, errorRegex(errors.noNumber));
    assert.throws(function() { say.thisNumber(undefined).in('english'); }, errorRegex(errors.noNumber));
  });
});

describe('Sanity tests', function() {
  var langs = say.thisNumber(50).languages;
  it('should return a list of languages', function() {
    assert.equal(langs.length, 20);
  });
  it('should say a 21', function() {
    for (var i = 0; i < langs.length; i++) {
      var l = langs[i];
      assert.doesNotThrow(function() {
        say.thisNumber(21).in(l);
      });
    }
  });
  it('should say a 467', function() {
    for (var i = 0; i < langs.length; i++) {
      var l = langs[i];
      assert.doesNotThrow(function() {
        say.thisNumber(467).in(l);
      });
    }
  });
  it('should say a 8732', function() {
    for (var i = 0; i < langs.length; i++) {
      var l = langs[i];
      assert.doesNotThrow(function() {
        say.thisNumber(8732).in(l);
      });
    }
  });
});
