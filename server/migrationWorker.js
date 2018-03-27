const fb = require('../db/liveClassroom')
const { db } = require('../db/mainDb')
const main = require('../db/mainDb')


// Converts a class in postgress to a sql obj
const psqlClassToFbObj = function(sqlClass) {
  var classObj = {[sqlClass.id]: {
    id: sqlClass.id,
    name: sqlClass.name, 
    subject: sqlClass.subject,
    teacher: {
        id: sqlClass.teacher_id,
        name: `${sqlClass.first_name} ${sqlClass.last_name}`,
        email: sqlClass.email
      }, 
    students: {}
    }
  }

const fbClassToPgObj = function(classObj) {
  const classId = classObj.id
  const { name, quizzes, students, teacher_id, subject_id } = classObj

  // save quizzes into submitted quizzes
  
    // for each quiz, associate student responses with questions and answers
        // save questions into submitted questions
            // save answers into submitted answers
               // save responses into students_responses

}

  // FIX: Consider doing this outise of this function

  // Gets student information for this class from db
  return db.query(`
    SELECT students.id, students.first_name, students.last_name, students.email 
    FROM students INNER JOIN classes_students 
    ON students .id = classes_students.student_id 
    WHERE classes_students.class_id=$1;`, [sqlClass.id]
  ).then((students => {

    students.rows.forEach(student => {
      classObj[sqlClass.id].students[student.id.toString()] = {
        name: `${student.first_name} ${student.last_name}`,
        isInClassroom: false,
        activeView: 'lobby',
        email: student.email,
        quizzes: {}
      }
    })
    return classObj
  }))
}

const migrateClassToFB = function(classId){
  main.fetchClass(classId)
  .then(classRow => {
    console.log(classRow[0])
    return psqlClassToFbObj(classRow[0])
  })
  .then(fbObj => {
    const classId = sqlClass.id
    const classList = fb.ref('/classes/' + classId) 
    return classList.push(fbObj)
  })
  .then(()=> console.log('Launched claass ' + sqlClass.name))
  .catch((err)=> console.log('Issue starting class' + err))
}

module.exports = {
  migrateClassToFB, 
}