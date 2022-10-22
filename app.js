const express = require('express');
const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');
const categoryRoute = require('./routes/categoryRoute');
const userRoute = require('./routes/userRoute');
const app = express();
const port = 5000;
//Template Engine
app.set("view engine", "ejs");

//Middlewares
app.use(express.static("public"));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

//Routes
app.use('/',pageRoute);
app.use('/courses',courseRoute);
app.use('/categories', categoryRoute);
app.use('/users', userRoute);


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})