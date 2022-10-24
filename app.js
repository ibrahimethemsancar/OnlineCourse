const express = require('express');
const mysql = require('mysql');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const {options, connection} = require('./services/database')
const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');
const categoryRoute = require('./routes/categoryRoute');
const userRoute = require('./routes/userRoute');
const app = express();
const port = 5000;
var sessionStore = new MySQLStore(options);

//Template Engine
app.set("view engine", "ejs");

//Global Variable

global.userIn = null;

//Middlewares
app.use(express.static("public"));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(session({
    secret: 'my_keyboard_cat',
    resave: false,
    saveUninitialized: true,
    store :sessionStore
  }));

//Routes
app.use('*', (req, res, next) => {
    userIn = req.session.userID;
    next();
})
app.use('/',pageRoute);
app.use('/courses',courseRoute);
app.use('/categories', categoryRoute);
app.use('/users', userRoute);


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})