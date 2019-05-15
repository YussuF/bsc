const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const path = require('path');
const port = 3001;
const morgan = require('morgan')
var http = require('http');

const app = express()
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(require('./routes/index.routes'))
{/*
const app = express();
app.use(pino);
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
*/}
var fs = require('fs'); /* Put it where other modules included */
let greeting = [];











app.get('/api/greeting', (req, res) => {
    var data = JSON.parse(fs.readFileSync('./output.json', 'utf8')); /* Inside the get function */
    const name = req.query.name || 'World';
    res.setHeader('Content-Type', 'application/json');
    res.sendFile(path.join(__dirname, './', 'output.json'));

});




app.post('/api/greeting', (req, res) => {
    console.log('receiving data ...');
    console.log('body is ',req.body);
    console.log(JSON.stringify(req.body));
    res.send(req.body);
    fs.writeFile('output2.json', JSON.stringify(req.body), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
})

// First route
app.get('/', (req, res) => {
    res.json({ message: 'Hello world' })
})


app.listen(3001, () =>
    console.log('Express server is running on localhost:3001')
);