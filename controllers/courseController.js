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
    //console.log(course);
    
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
    let categorySlug = req.query.categories;
   
    let categoryCondition = `1=1`;
    function getCategoryId(categorySlug){
      
      let query = `select id from online_course_db.categories
        where slug = '${categorySlug}'`;
        //console.log(query)
        return new Promise((resolve, reject) => {
      connection.query(query, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result[0]?.id);
        }
      });
    });
    };
    if(categorySlug){
  
    categoryId = await getCategoryId(categorySlug);
    
    if(typeof categoryId != 'number'){
      categoryCondition = `categoryId = 0`
    }else{
      categoryCondition = `categoryId = ${categoryId}`
    }
    
    
  }
  function getCourses(categoryCondition) {
    let query = `select * from online_course_db.courses
    where ${categoryCondition}`;
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
  function getCategories() {
    let query = `select * from online_course_db.categories
        `;
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
  
    const courses = await getCourses(categoryCondition);
    const categories = await getCategories();
    //console.log(courses) 
    
   res.status(200).render('courses', {
    courses,
    categories,
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