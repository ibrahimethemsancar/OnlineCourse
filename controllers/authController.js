const connection = require("../services/database");
const bcrypt = require('bcrypt');
exports.createUser =  async (req, res) => {
  try {
  let name = req.body.name;
  let password = req.body.password;
  let encryptedPassword = await bcrypt.hash(password,10);
  let email = req.body.email;

  function create() {
    let query = `INSERT INTO online_course_db.users
        (name, email, password) values ('${name}', '${email}', '${encryptedPassword}')`;
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
    
      res.status(201).json({
          status : 'success',
          message : "The new user is created." 
        })
  }
  else{
    res.status(400).json({
      status : 'fail',
      error : "The user's information is lacking."
    })
  }
 
  } catch (error) {
    res.status(400).json({
        status : 'fail',
        error 
      })
  }
 
};