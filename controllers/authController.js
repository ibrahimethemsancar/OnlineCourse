const {connection} = require("../services/database");
const bcrypt = require('bcrypt');
exports.createUser =  async (req, res) => {
  try {
  let name = req.body.name;
  let password = req.body.password;
  let encryptedPassword = await bcrypt.hash(password,10);
  let email = req.body.email;
  let role = (req.body.role).toLowerCase();

  function create() {
    let query = `INSERT INTO online_course_db.users
        (name, email, password, role) values ('${name}', '${email}', '${encryptedPassword}', '${role}')`;
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
  if(name !== undefined && email !== undefined && password !==undefined ){
    const category = await create();
    console.log(category);
    
      res.status(201).redirect('/login')
  }
  else{
    res.status(400).json({
      status : 'fail',
      error : "The user's information is lacking."
    })
  }
 
  } catch (error) {
    console.log(error)
    res.status(400).json({
        status : 'fail',
        error 
      })
  }
 
};

exports.loginUser =  async (req, res) => {
  try {
  let {email, password} = req.body;
  function findUser() {
    let query = `select id,name,password,email from online_course_db.users
        where email = '${email}'`;
    return new Promise((resolve, reject) => {
      connection.query(query, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result[0]);
        }
      });
    });
  }
    const user= await findUser();
    if(user){
      bcrypt.compare(password, user.password, (err, same) => {
        if(same){
          //user session
          req.session.userID = user.id;
          res.status(200).redirect('/')
        }
      })
    }
    
  
 
  } catch (error) {
    res.status(400).json({
        status : 'fail',
        error 
      })
  }
 
};
exports.logOutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  })
};

exports.getDashboardPage = async(req, res) =>{
  const userId = req.session.userID;
  function findUser() {
    let query = `select * from online_course_db.users
        where id = '${userId}'`;
    return new Promise((resolve, reject) => {
      connection.query(query, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result[0]);
        }
      });
    });
  };
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
  };
  function getCourses() {
    let query = `select * from online_course_db.courses
        where user_id = ${req.session.userID} `;
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
  
  const categories = await getCategories();
  const user = await findUser();
  const courses = await getCourses();
  console.log(user);
  res.status(200).render("dashboard", {
      page_name : "dashboard",
      user,
      categories,
      courses
  });
};