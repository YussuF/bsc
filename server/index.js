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



app.post('/api/category', (req, res) => {
    console.log('receiving data ...');
    console.log('body is ',req.body);
    console.log(JSON.stringify(req.body));
    res.send(req.body);
    fs.readFile('./src/categorymock.json', function (err, data) {
        var json = JSON.parse(data);
        var count = Object.keys(json).length + 1;
        var json2 = JSON.stringify(json).substring(0,JSON.stringify(json).length-1 );
        var newCat = ',"Cat' + count + '": "' + req.body.e + '"}';
        var final = json2.concat(newCat);
        fs.writeFile("./src/categorymock.json",final, (err) => {
            if (err) throw err;
        })
    })
})




app.post('/api/categoryremove', (req, res) => {


    fs.readFile('./src/categorymock.json', function (err, data) {
        var json = JSON.parse(data);
        var count = Object.keys(json).length;
        var cat = 'Cat' + count;
        console.log(cat);
        delete json[cat];
        console.log(json);
        fs.writeFile("./src/categorymock.json", JSON.stringify(json), (err) => {
            if (err) throw err;
        })
    })
})


app.post('/api/categoryrename', (req, res) => {
    console.log('receiving data ...');
    console.log('body is ',req.body);
    console.log(JSON.stringify(req.body));
    var catnr = req.body.catnr;
    console.log(typeof catnr);
    fs.readFile('./src/categorymock.json', function (err, data) {
        var json = JSON.parse(data);
        json[catnr] = req.body.catname;
        console.log(json);
        fs.writeFile("./src/categorymock.json", JSON.stringify(json), (err) => {
            if (err) throw err;
        })
    })

})



app.post('/api/greeting', (req, res) => {
    console.log('receiving data ...');
    console.log('body is ',req.body);
    console.log(JSON.stringify(req.body));
    res.send(req.body);
    fs.readFile('./src/output2.json', function (err, data) {
        var json = JSON.parse(data);
        json.push(req.body);
        fs.writeFile("./src/output2.json", JSON.stringify(json), (err) => {
            if (err) throw err;
        })
    })
})

// First route
app.get('/', (req, res) => {
    res.json({ message: 'Hello world' })
})


app.listen(3001, () =>
    console.log('Express server is running on localhost:3001')
);