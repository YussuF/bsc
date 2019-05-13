const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const path = require('path');
const port = 3001;

const app = express();
app.use(pino);
app .use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

var fs = require('fs'); /* Put it where other modules included */
let greeting = [];




app.get('/api/greeting', (req, res) => {
    var data = JSON.parse(fs.readFileSync('./output.json', 'utf8')); /* Inside the get function */
    const name = req.query.name || 'World';
    res.setHeader('Content-Type', 'application/json');
    res.sendFile(path.join(__dirname, './', 'output.json'));

});

app.post('/api/greeting', (req, res) => {
    const newentry = {
        bla: req.body.d
    }
    greeting.push(newentry);
    console.log('receiving data ...');
    console.log('body is ',req.body);
    console.log(JSON.stringify(newentry));
    res.send(JSON.stringify(newentry));
})



app.listen(3001, () =>
    console.log('Express server is running on localhost:3001')
);
