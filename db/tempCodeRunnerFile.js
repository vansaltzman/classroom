const firebase = require('firebase');
const config = require('../server/config.js');
const dummyStudentData=require('../db/dummyStudentsData');

firebase.initializeApp(config.fbConfig);
const fb = firebase.database();

fb.ref('/classes').child('1').set({val: 'test'})