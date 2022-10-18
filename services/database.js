const mysql = require('mysql');

var connection = mysql.createConnection({
    host:'localhost',
    port:3306,
    database:'online_course_db',
    user:'root',
    password:'password',
});

connection.connect((err) =>{
    if(err){
        throw err;
    }
    else{
        console.log('MySql Database is connected.');
    }
} );

module.exports = connection;