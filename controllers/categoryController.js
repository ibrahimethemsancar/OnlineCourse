const {connection} = require("../services/database");
const moment = require('moment');
const slugify = require('slugify');
exports.createCategory = async (req, res) => {
  try {
  let name = req.body.name;
  let categorySlug = slugify(req.body.name, {
    replacement : '-',
    lower : true
  })

  function create() {
    let query = `INSERT INTO online_course_db.categories
        (name, slug) values ('${name}', '${categorySlug}')`;
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
  if(name !== undefined ){
    const category = await create();
    console.log(category);
    
      res.status(201).json({
          status : 'success',
          message : "The new category is created." 
        })
  }
  else{
    res.status(400).json({
      status : 'fail',
      error : "The category's information is lacking."
    })
  }
  } catch (error) {
    res.status(400).json({
        status : 'fail',
        error 
      })
  }
 
};