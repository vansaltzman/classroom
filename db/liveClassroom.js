const firebase = require('firebase');
const config = require('../server/config.js');
const dummyStudentData=require('../db/dummyStudentsData');

// firebase.initializeApp(config.fbConfig);
// var config = {
//   apiKey: "AIzaSyCNOO34AZkHCvUnp3uNLYec1EsFTooWaBU",
//   authDomain: "test-1-84a61.firebaseapp.com",
//   databaseURL: "https://test-1-84a61.firebaseio.com",
//   projectId: "test-1-84a61",
//   storageBucket: "test-1-84a61.appspot.com",
//   messagingSenderId: "56358894521"
// };
// Add config

// var config = {
//   apiKey: "AIzaSyCNOO34AZkHCvUnp3uNLYec1EsFTooWaBU",
//   authDomain: "test-1-84a61.firebaseapp.com",
//   databaseURL: "https://test-1-84a61.firebaseio.com",
//   projectId: "test-1-84a61",
//   storageBucket: "test-1-84a61.appspot.com",
//   messagingSenderId: "56358894521"
// };

firebase.initializeApp(config.fbConfig);
const fb = firebase.database();

module.exports = {  
  fb
}