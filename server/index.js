const express = require('express');
const path = require('path')
const bodyParser = require('body-parser')
const main = require('../db/mainDb.js')
const migration = require('./migrationWorker.js')
const { fb } = require('../db/liveClassroom.js')

const app = express()

app.use(express.static(__dirname + '/../dist'))
app.use(bodyParser.json())

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
  app.post('/startClass', (erq, res) => {
    const { classId } = req.body

    migration.migrateClassToFB(classId)
    .then(()=> {

      // update redux state?

      res.sendStatus(200)
      return
    })
    .catch(() => {
      console.log('Issue starting live class')
      res.sendStatus(500)
    })
  })
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

