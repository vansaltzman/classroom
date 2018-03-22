const express = require('express');
const path = require('path')
const bodyParser = require('body-parser')
const main = require('../db/mainDb.js');
const jwt = require('jsonwebtoken');
const dbMethods = require('../db/mainDb.js');
const config = require('./config.js');
const migration = require('./migrationWorker.js')
// const { fb } = require('../db/liveClassroom.js')

const app = express()

app.use(express.static(__dirname + '/../dist'))
app.use(bodyParser.json())

// Sign up
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
  app.post(`/auth/login`, (req, res)=> {
    var email = req.body.email;
    var password = req.body.password;
    dbMethods.verifyUser(email, password)
    .then( (check)=> {
      // this adds the email to our object that we will then add to our store with user info
      check.email = email;
      const newToken = jwt.sign(check, config.jwtSecret);
      if (check) {
        check.token = newToken;
      }
      console.log('check before sending back to server ', check)
      res.send(check)
    })
  
    .catch((err)=> {
      if(err) {
        console.log('err in accessing db when logging in ', err);
      }
    })
  })


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
  
app.post('/addClass', (req, res) => {
  console.log('server side data for add class',  req.body);
  main.addNewClass(req.body)
  .then(() => {
    console.log('Class is added')
  })
  .catch((err) => {
    if (err) throw err;
  })
})

app.post('/allClasses', (req, res) => {
  //console.log('serverside /allClasses', req.body);
  main.getClassesForTeacherMainView(req.body.email)
  .then((data) => {
    res.send(data.rows);
    //console.log('server side classes', data.rows)
  })
  .catch((err) => {
    if (err) throw err;
  })
})

app.get('/getAllStudents', (req, res) => {
  main.getAllStudents()
  .then((data) => {
    //console.log('serverside', data.rows);
    res.send(data.rows);
  })
  .catch((err) => {
    if (err) throw err
  })
})

app.post('/getAllStudentsInAClass', (req, res) => {
  //console.log('class id server side', req.body);
  main.getAllStudentsBelongToAClass(req.body.id)
  .then((data) => {
    res.send(data.rows);
    //console.log('server side data', data.rows);
  })
  .catch((err) => {
    if (err) throw err
  })
  
})

app.post('/getStudentsClasses', (req, res) => {
  main.getClassesBelongToAStudent(req.body.email)
  .then((data) => {
    res.send(data.rows);
    console.log('server side data', data.rows);
  })
  .catch((err) => {
    if (err) throw err
  })
})

const port = 3000
app.listen(port, function() {
  console.log('Listening on ' + port)
})

