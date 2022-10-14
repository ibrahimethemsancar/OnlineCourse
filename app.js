const express = require('express');

const app = express();
const port = 5000;
//Template Engine
app.set("view engine", "ejs");

//Middlewares
app.use(express.static("public"));

//Routes
app.get('/', (req, res) =>{
    res.status(200).render("index", {
        page_name : "index"
    });
});
app.get('/about', (req, res) =>{
    res.status(200).render('about', {
        page_name : "about"
    });
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})