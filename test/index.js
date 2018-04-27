var assert = require('assert');
var errors = require('./errors.js');
var stn = require('../dist/saythisnumber.js');

var sayThisNumber = stn.default;
var sayTheseNumbers = stn.sayTheseNumbers;
var sayNumberRange = stn.sayNumberRange

describe('GET success tests', function() {
  it('should return a number', function(){
    assert.equal(sayThisNumber(42).in('english'), 'forty two');
    assert.equal(sayThisNumber(-42).in('english'), 'negative forty two');
  });
  it('should return a range of numbers', function(){
    assert.deepEqual(sayTheseNumbers([1,2,42]).in('english'), ['one','two','forty two']);
    assert.deepEqual(sayNumberRange(1,5).in('english'), ['one', 'two', 'three', 'four', 'five']);
    assert.deepEqual(sayNumberRange(5,1).in('english'), ["five", "four", "three", "two", "one"]);
  });
});
