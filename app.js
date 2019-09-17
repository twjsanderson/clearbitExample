var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();

var app = express();

const KEY = process.env.API_KEY;  // clearbit api key
const EMAIL = '<email address>@yahoo.ca' // input email address to look up person/company info  

var clearbit = require('clearbit')(KEY);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

clearbit.Enrichment.find({email: EMAIL, stream: true})
  .then(function (response) {
    var person  = response.person;
    var company = response.company;

    console.log('Name: ', person && person.name.fullName, 'Company: ', company);
  })
  .catch(function (err) {
    console.error(err);
  });

module.exports = app;
