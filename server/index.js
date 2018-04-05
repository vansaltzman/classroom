const express = require('express');
const path = require('path')
const bodyParser = require('body-parser')
const main = require('../db/mainDb.js');
const jwt = require('jsonwebtoken');
const dbMethods = require('../db/mainDb.js');
// const config = require('./config.js');
const config = require('./config.js');
const migration = require('./migrationWorker.js')
const { fb, startClass } = require('../db/liveClassroom.js');
const dummyAnswerData = require('../db/dummyAnswerData');
const dummyStudentsData = require('../db/dummyStudentsData');

const dotenv = require('dotenv');
const {error} = dotenv.config();
console.log('process env project id in server ', process.env.projectId);
if (error) {
  console.log('error in dotenv ', error)
}

const multer = require('multer');
const AWS = require('aws-sdk');
var fs =  require('fs');
const configAWS = require('./configAWS.js')

  
const app = express()

app.use(express.static(__dirname + '/../dist'))
app.use(bodyParser.json())


// Amazon s3 config

AWS.config.update(  {
  accessKeyId: configAWS.AWS_ACCESS_KEY_ID,
  secretAccessKey: configAWS.AWS_SECRET_ACCESS_KEY,
  region: configAWS.REGION 
});

const s3 = new AWS.S3();
const upload = multer({dest: 'uploads/'});

app.post('/imageUploader', upload.single('file'), (req, res) => {
  var myBucket = 'jaqen-app';
  var myKey = req.file.originalname;

  fs.readFile(req.file.path, function (err, data) {
    if (err) {
      console.log(err)
    } else {
      s3.createBucket({ Bucket: myBucket}, function ()  {
          const params = {
            Bucket: myBucket,
            Key: myKey,
            Body: data,
            ContentType: req.file.mimetype
        };
        s3.putObject(params, function (err, data) {
          if (err) {
            console.log(err)
          } else {
            const urlParams = {Bucket: myBucket, Key: myKey};
            s3.getSignedUrl('getObject', urlParams, function(err, url){
              const fileUrl = url.split('?')[0]
              res.send(fileUrl)

              fs.unlink(req.file.path, (err) => {
                if (err) console.log(err);
              
                //req.body.classPic//true for teacher view//false for student view
                if(req.body.classPic === false){
                  console.log('req.body.classPic', req.body.classPic)
                  // main.addClassPic(fileUrl)
                  console.log('------class pic -----',fileUrl)
                  // ('---this should only run from teacher uploading class pic---')
                } 
                else {
                  main.addProfilePictureForStudent(req.body.text, fileUrl)
                  
                }
              //main.addProfilePictureForStudent(req.body.text, fileUrl) 
              })
            })
          }
        })
      })
    }
  })
})



app.post('/profile', function(req, res) {
   let user =req.body.user
   main.getProfilePic(user)
     .then(function(data){
       res.send(data);
    })
     .catch(function(err) {
       console.log('server profile post request -', err)
    })    
})  

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
  app.post('/startClass', (req, res) => {
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
 

  // Answer Quiz Question
  app.post('/updateLiveQuizAnswers', (req, res)=> {
    var studentId = 37;
    var quizId = 12;
    var classId = 3;
    updateQuizResponses(dummyAnswerData, studentId, quizId, classId)
    // .then(()=> {
    //   res.sendStatus(200)
    // })
    // .catch((err)=> {
    //   console.log('err in updating quiz response ', err)
    // })
    //console.log('dummy data ', dummyAnswerData)
  })

  // app.post('/answer', (req, res) => {
  //   let answer = req.body.answer
  //   console.log('answer submitted', answer)
  // })

  app.post('/answer', (req, res) => {
    let answer = req.body.answer
    //console.log('answer submitted', answer)
  })

  // Complete Quiz
  
app.post('/addClass', (req, res) => {
  console.log('server side data for add class',  req.body);
  main.addNewClass(req.body)
  .then((data) => {
    console.log('Class is added', data)
    res.send(data)
  })
  .catch((err) => {
    if (err) throw err;
  })
})

app.post('/getNewAddedClass', (req,res) => {
  //console.log('get data from server side for added class', req.body)
  const className = req.body.classname
  const email = req.body.email
  main.getNewAddedClass(email, classname)
  .then((data) => {
    //console.log('data on server side for newly added class', data)
    res.send(data)
  })
})

app.post('/allClasses', (req, res) => {
  //console.log('serverside /allClasses', req.body);
  main.getClassesForTeacherMainView(req.body.email)
  .then((data) => {
    //console.log('data ------> ', data)
    res.send(data);
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
    console.log('server side data with thumbnails', data.rows);
    res.send(data.rows);
    
  })
  .catch((err) => {
    if (err) throw err
  })
  
})

app.post('/getStudentsClasses', (req, res) => {
  main.getClassesBelongToAStudent(req.body.email)
  .then((data) => {
    res.send(data.rows);
    //console.log('server side data', data.rows);
  })
  .catch((err) => {
    if (err) throw err
  })
})

app.post('/addAStudentToClass', (req, res) => {

  main.addStudentToAClass(req.body.classId, req.body.studentId)
  .then((data) => {
    //console.log('data at server side', data)
    res.send(data.rows);
  })
  //console.log('server student to be added', req.body)
})

app.get('/getAllSubjects', (req, res) => {
  main.getAllExistingSubjects()
  .then((data) => {
    //console.log('server side all Subjects', data.rows)
    res.send(data.rows)
  })
  .catch((err) => {
    if (err) throw err;
  })
})

app.post('/addQuiz', (req, res) => {
  console.log('server side newQuiz', req.body);
  main.addQuiz(req.body)
  .then((data) => {
    console.log('refetched quizzes at server side', data)
    res.send(data)
  })
})

app.post('/getQuizzes', (req, res) => {
  //console.log('serverside quizzes req obj', req.body)
  main.getQuizzes(req.body.teacherId, req.body.subjectId)
  .then((data) => {
    res.send(data)
  })
})

app.post('/fetchQuestions', (req,res) => {
  main.GetAllQuestionsBelongToTeacher(req.body.teacherId, req.body.subjectId)
  .then((data) => {
    //console.log('serverside questions data', data)
    res.send(data)
  })
})
const port = 3000
app.listen(port, function() {
console.log('Listening on ' + port)
})

