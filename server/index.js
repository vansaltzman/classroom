const express = require('express');
const path = require('path')
const bodyParser = require('body-parser')
const main = require('../db/mainDb.js')
// const { fb } = require('../db/liveClassroom.js')

const app = express()

app.use(express.static(__dirname + '/../dist'))
app.use(bodyParser.json())


// app.post('/newAccount', function(req, res){
//   let email = req.body.newAccount.email
//   let password = req.body.newAccount.password
//   let firstName = req.body.newAccount.firstName
//   let lastName = req .body.newAccount.lastName  
//   let userClass = req.body.newAccount.userClass
  
//   console.log('server/index.js - new account -', email, password, firstName, lastName, userClass)  
// })

// Sign up
  // Specifiy user class in params
  app.post('/newAccount', (req, res)=> {
    const {firstName, lastName, email, password, userClass} = req.body.newAccount

    main.addUser(firstName, lastName, email, password, userClass)
    .then((data)=> {
      if (data === 'User already exists')
      console.log('user already exits')
      res.sendStatus(403)
    })
    .catch(err => {
      res.sendStatus(500)
    })
  })

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

