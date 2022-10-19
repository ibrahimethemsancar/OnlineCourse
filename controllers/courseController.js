const connection = require("../services/database");
const moment = require('moment');
const slugify = require('slugify');
exports.createCourse = async (req, res) => {
  try {
  let name = req.body.name;
  let description = req.body.description;
  let courseSlug = slugify(req.body.name, {
    replacement : '-',
    lower : true
  })
  let created_at = moment().format('YYYY-MM-DD HH:mm:ss');
  function createCourse() {
    let query = `INSERT INTO online_course_db.courses
        (name,description,created_at, slug) values ('${name}', '${description}', '${created_at}', '${courseSlug}')`;
    return new Promise((resolve, reject) => {
      connection.query(query, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
  if(name !== undefined && description !==undefined){
    const course = await createCourse();
    console.log(course);
    
      res.status(201).json({
          status : 'success',
          message : "The new course is created." 
        })
  }
  else{
    res.status(400).json({
      status : 'fail',
      error : "The course's information is lacking."
    })
  }
  } catch (error) {
    res.status(400).json({
        status : 'fail',
        error 
      })
  }
 
};


exports.getAllCourses = async (req, res) => {
  try {
  function getCourses() {
    let query = `select * from online_course_db.courses
        `;
    return new Promise((resolve, reject) => {
      connection.query(query, (err, result) => {
        if (err) {
          reject(err);
        } else {
          console.log(result)
          resolve(result);
        }
      });
    });
  }
  
    const courses = await getCourses();
 //   console.log(course);
    
   res.status(200).render('courses', {
    courses,
    page_name : 'courses'
   })
  } catch (error) {
    res.status(400).json({
        status : 'fail',
        error : error
      })
  }
 
};

exports.getCourse = async (req, res) => {
  try {

  function getCourse() {
    let query = `select * from online_course_db.courses where slug = '${req.params.slug}'
        `;
    return new Promise((resolve, reject) => {
      connection.query(query, (err, result) => {
        if (err) {
          reject(err);
        } else {
          console.log(result)
          resolve(result);
        }
      });
    });
  }
  
    const course = await getCourse();
 //   console.log(course);
    
   res.status(200).render('course', {
    course,
    page_name : 'courses'
   })
  } catch (error) {
    res.status(400).json({
        status : 'fail',
        error : error
      })
  }
 
};