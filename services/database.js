const mysql = require('mysql');

let options = {
    host:'localhost',
    port:3306,
    database:'online_course_db',
    user:'root',
    password:'password',
};
var connection = mysql.createConnection(options);
connection.connect((err) =>{
    if(err){
        throw err;
    }
    else{
        console.log('MySql Database is connected.');
    }
} );

module.exports ={ connection , options};