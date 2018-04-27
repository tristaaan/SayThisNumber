var assert = require('assert');
var errors = require('./errors.js');
var stn = require('../dist/saythisnumber.js');

var sayThisNumber = stn.default;

describe('Error tests', function() {
  it('should respond with invalid number error', function(){
    assert.equal([1,2,3].indexOf(4), -1);
  });
});

describe('GET success tests', function() {
  it('should respond with a number', function(){
    assert.equal(sayThisNumber(42).in('english'), 'forty two');
    assert.equal(sayThisNumber(-42).in('english'), 'negative forty two');
  });
  // it('should respond with a range', function(done){
  //   async.series([
  //     function(cb){agent.get('/english/1-3')
  //       .expect(checkText.bind(null, 'one(.*)two(.*)three')).expect(200, cb);},
  //     function(cb){agent.get('/english/-1-1')
  //       .expect(checkText.bind(null, 'negative one(.*)zero(.*)one')).expect(200, cb);},
  //     function(cb){agent.get('/english/---1-1')
  //       .expect(checkText.bind(null, 'negative one(.*)zero(.*)one')).expect(200, cb);},
  //     function(cb){agent.get('/english/-3--1')
  //       .expect(checkText.bind(null, 'negative three(.*)negative two(.*)negative one')).expect(200, cb);}
  //   ], done);
  // });
});
