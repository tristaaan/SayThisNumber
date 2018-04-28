var assert = require('assert');
// var errors = require('./errors');
var stn = require('../dist/saythisnumber.js');

var sayThisNumber = stn.default;
var sayTheseNumbers = stn.sayTheseNumbers;
var sayThisNumberRange = stn.sayThisNumberRange;

/* global describe it */

describe('Basic tests', function() {
  it('should return a number', function() {
    assert.equal(sayThisNumber(42).in('english'), 'forty two');
    assert.equal(sayThisNumber(-42).in('english'), 'negative forty two');
  });
  it('should return a range of numbers', function() {
    assert.deepEqual(sayTheseNumbers([1, 2, 42]).in('english'), ['one', 'two', 'forty two']);
    assert.deepEqual(sayThisNumberRange(1, 5).in('english'), ['one', 'two', 'three', 'four', 'five']);
    assert.deepEqual(sayThisNumberRange(5, 1).in('english'), ['five', 'four', 'three', 'two', 'one']);
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
