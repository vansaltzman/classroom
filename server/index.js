const express = require('express');
const path = require('path')
const bodyParser = require('body-parser')
const { db } = require('../db/mainDb.js')
// const { fb } = require('../db/liveClassroom.js')

const app = express()

app.use(express.static(__dirname + '../dist'))
app.use(bodyParser.json())

// Sign up
  // Specifiy user class in params

// Login
  // Specifiy user class in params


// Teacher

  // Start class

  // Start Quiz

  // End Class

// Student

  // Join Class in session
  
  // Answer Quiz Question

  // Complete Quiz



const port = 3000
app.listen(port, function() {
  console.log('Listening on ' + port)
})

