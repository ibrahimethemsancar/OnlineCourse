const express = require('express');

const app = express();

const port = 5000;

app.get('/', (req, res) =>{
    res.send('İndex sayfası')
})

app.listen(port, () => {
    console.log(`Serves is listening on port ${port}`);
})