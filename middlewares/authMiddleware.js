const {connection} = require('../services/database');

module.exports = async(req, res, next) => {
    try {
        const userId = req.session.userID;
        function findUser(id) {
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
          const user = await findUser(userId);
          if(!user){
            return res.redirect('/login')
          }
          next();
    } catch (error) {
        return res.status(400).send(error);
    }
   
}