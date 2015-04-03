var request = require('supertest');
var express = require('express');
var async = require('async');

var app = require('../application/app.js');
var errors = require('../application/errors.js');

describe('GET error tests', function(){
  var agent = request(app);
  it('should respond with malformed url', function(done){
    agent
    .get('/foo%')
    .expect(500)
    .expect(checkText.bind(null, errors.invalidURL))
    .end(done);
  });
  it('should respond with no number error', function(done){
    async.series([
      function(cb){ agent.get('/foo')
        .expect(checkText.bind(null, errors.noNumber)).expect(200, cb)},
      function(cb){ agent.get('/dutch')
        .expect(checkText.bind(null, errors.noNumber)).expect(200, cb)},
      function(cb){ agent.get('/english/')
        .expect(checkText.bind(null, errors.noNumber)).expect(200, cb)},
    ], done);
  });
  it('should respond with invalid number error', function(done){
    async.series([
      function(cb){ agent.get('/english/hello')
        .expect(checkText.bind(null, errors.invalidNumber)).expect(200, cb)},
      function(cb){ agent.get('/english/23f')  
        .expect(checkText.bind(null, errors.invalidNumber)).expect(200, cb)}
    ], done);
  });
  it('should respond with range too large error', function(done){
    async.series([
      function(cb){ agent.get('/english/0-5001')
        .expect(checkText.bind(null, errors.rangeTooLarge)).expect(200, cb)},
      function(cb){ agent.get('/norwegian/-2500-3000')
        .expect(checkText.bind(null, errors.rangeTooLarge)).expect(200, cb)}
    ], done);
  });
  it('should respond with invalid range error', function(done){
    async.series([
      function(cb){ agent.get('/italian/1-1')
        .expect(checkText.bind(null, errors.invalidRange)).expect(200, cb)},
      function(cb){ agent.get('/czech/10-1')
        .expect(checkText.bind(null, errors.invalidRange)).expect(200, cb)}
    ], done);
  });
  it('should respond with start of range too small or large', function(done){
    async.series([
      function(cb){ agent.get('/english/'+(Math.pow(10,15)+1)+'-'+(Math.pow(10,15)+5))
        .expect(checkText.bind(null, errors.startTooLarge)).expect(200, cb)},
      function(cb){ agent.get('/english/'+(-Math.pow(10,15)-5)+'-'+(-Math.pow(10,15)+10))
        .expect(checkText.bind(null, errors.startTooSmall)).expect(200, cb)}
    ], done);
  });
  it('should contain a number too small or large error', function(done){
    async.series([
      function(cb){ agent.get('/english/'+(Math.pow(10,15)+1))
        .expect(checkText.bind(null, errors.numberTooLarge)).expect(200, cb)},
      function(cb){ agent.get('/english/'+(-Math.pow(10,15)-1))
        .expect(checkText.bind(null, errors.numberTooSmall)).expect(200, cb)}
    ], done);
  });
});

describe('GET success tests', function(){
  var agent = request(app);
  it('should respond with the index page', function(done){
    agent
    .get('/')
    .expect(200)
    .expect(checkText.bind(null, 'Say This Number'))
    .end(done);
  });
  it('should respond with a number', function(done){
    async.series([
      function(cb){agent.get('/english/1').expect(checkText.bind(null, 'one')).expect(200, cb);},
      function(cb){agent.get('/english/-1').expect(checkText.bind(null, 'negative one')).expect(200, cb);}
    ], done);
  });
  it('should respond with a range', function(done){
    async.series([
      function(cb){agent.get('/english/1-3')
        .expect(checkText.bind(null, 'one(.*)two(.*)three')).expect(200, cb);},
      function(cb){agent.get('/english/-1-1')
        .expect(checkText.bind(null, 'negative one(.*)zero(.*)one')).expect(200, cb);},
      function(cb){agent.get('/english/---1-1')
        .expect(checkText.bind(null, 'negative one(.*)zero(.*)one')).expect(200, cb);},
      function(cb){agent.get('/english/-3--1')
        .expect(checkText.bind(null, 'negative three(.*)negative two(.*)negative one')).expect(200, cb);}
    ], done);
  });
});

function checkText(checker, res){
  if (RegExp(checker).test(res.text)){
    return;
  }
  else{
    throw '"' + checker + '" not found in response';
  }
}