var request = require('supertest');
var express = require('express');

var app = require('../application/app.js');
var errors = require('../application/errors.js');

describe('plain GET', function(){
  it('responds with index page', function(done){
    request(app)
    .get('/')
    .expect(200, done);
  });
  it('checks', function(done){
    request(app)
    .get('/foo')
    .expect(500)
    .expect(checkText.bind(null, errors.noNumber))
    .end(done);
  });
});

function checkText(checker, res){
  console.log(checker, res.text);
  if (RegExp(checker).test(res.text)){
    return;
  }
  else{
    return "no pass";
  }
}