const firebase = require('firebase');
const config = require('../server/config.js');
const dummyStudentData=require('../db/dummyStudentsData');

firebase.initializeApp(config.fbConfig);
const fb = firebase.database();

module.exports = {  
  fb
}