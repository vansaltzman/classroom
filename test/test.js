var assert = require('assert')
var dbTest = require('./db/dbTests.js')
var serverTest = require('./server/serverTests.js');

// Import tests to run here

dbTest.signUp()
dbTest.verifyUser()
serverTest.logIn();

