const express = require('express')
const fs = require('fs');
const status = require('express-status-monitor')

const app = express()

app.use(status());

app.get('/', (req, res) => {
    fs.readFile('./sample.txt', (err, data) => {
        res.end(data);
    })
})


app.listen(3000, ()=>{
    console.log("Server is on Port 3000");
    
})