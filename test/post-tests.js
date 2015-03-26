var request = require('supertest');
var express = require('express');
var async = require('async');

var app = require('../application/app.js');
var errors = require('../application/errors.js');

describe('POST tests', function(){
  var agent = request(app);
  it('should respond with usage error', function(done){
    async.series([
      function(cb){agent.post('/').expect('Content-Type', /json/)
        .expect(checkJSON.bind(null, 'error', errors.usageError)).expect(200, cb);
      },
      function(cb){agent.post('/foo').expect('Content-Type', /json/)
        .expect(checkJSON.bind(null, 'error', errors.usageError)).expect(200, cb);
      },
      function(cb){agent.post('/english').expect('Content-Type', /json/)
        .expect(checkJSON.bind(null, 'error', errors.usageError)).expect(200, cb);
      }
    ], done);
  });
  it('should respond with malformed url', function(done){
    agent
    .post('/foo%')
    .expect(500)
    .expect(checkText.bind(null, errors.invalidURL))
    .end(done);
  });
  it('should respond with invalid number error', function(done){
    async.series([
      function(cb){agent.post('/english/23f').expect('Content-Type', /json/)
        .expect(checkJSON.bind(null, 'error', errors.invalidNumber)).expect(200, cb);
      },
      function(cb){agent.post('/english/hello').expect('Content-Type', /json/)
        .expect(checkJSON.bind(null, 'error', errors.invalidNumber)).expect(200, cb);
      }
    ], done);
  });
    it('should respond with range too large error', function(done){
    async.series([
      function(cb){ agent.post('/english/0-5001').expect('Content-Type', /json/)
        .expect(checkJSON.bind(null, 'error', errors.rangeTooLarge)).expect(200, cb)},
      function(cb){ agent.post('/norwegian/-2500-3000').expect('Content-Type', /json/)
        .expect(checkJSON.bind(null, 'error', errors.rangeTooLarge)).expect(200, cb)}
    ], done);
  });
  it('should respond with invalid range error', function(done){
    async.series([
      function(cb){ agent.post('/italian/1-1').expect('Content-Type', /json/)
        .expect(checkJSON.bind(null, 'error', errors.invalidRange)).expect(200, cb)},
      function(cb){ agent.post('/czech/10-1').expect('Content-Type', /json/)
        .expect(checkJSON.bind(null, 'error', errors.invalidRange)).expect(200, cb)}
    ], done);
  });
  it('should respond with start of range too small or large', function(done){
    async.series([
      function(cb){ agent.post('/english/'+(Math.pow(10,15)+1)+'-'+(Math.pow(10,15)+5))
        .expect(checkJSON.bind(null, 'error', errors.startTooLarge)).expect(200, cb)},
      function(cb){ agent.post('/english/'+(-Math.pow(10,15)-5)+'-'+(-Math.pow(10,15)+10))
        .expect(checkJSON.bind(null, 'error', errors.startTooSmall)).expect(200, cb)}
    ], done);
  });
  it('should contain a number too small or large error', function(done){
    async.series([
      function(cb){ agent.post('/english/'+(Math.pow(10,15)+1)).expect('Content-Type', /json/)
        .expect(checkJSON.bind(null, 'error', errors.numberTooLarge)).expect(200, cb)},
      function(cb){ agent.post('/english/'+(-Math.pow(10,15)-1)).expect('Content-Type', /json/)
        .expect(checkJSON.bind(null, 'error', errors.numberTooSmall)).expect(200, cb)}
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

function checkJSON(key, checker, res){
  var json = JSON.parse(res.text);
  if (json[key] === checker){
    return;
  }
  else{
    throw '"' + key + '":"' + checker + '" not found in response';
  }
}