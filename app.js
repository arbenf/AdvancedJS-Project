// Require the express module
const express = require('express');
let routes = require('./controllers/routes');
//let bodyparser = require('body-parser');
// Create a new web server
const app = express();

app.set('view engine', 'ejs');

// Tell the web server to serve files
// from the www folder
app.use(express.static('www'));

//fire controllers
routes(app);

// Start the web server on port 3000
app.listen(3000,() => console.log('Listening on port 3000'));

// Require the built in file system module
//const fs = require('fs');
// Read the json livsmedelsdata into ldata
// (convert it from a JSON-string to JS data)
/*const ldata = JSON.parse(
  fs.readFileSync('./json/livsmedelsdata.json')
);*/

//fs.writeFileSync('./json/copie.json', ldata);

//console.log(ldata);

// Create a route where we'll return 
// the first 5 items from ldata as json
/*app.get('/first-five',(req, res) =>{
  //res.sendFile(__dirname + '/www/index.html');
  res.json(ldata);
});

app.get('/',(req, res) =>{
  res.render('index', {
    livsmedelsdata: ldata
  });
});

app.get('/contact',(req, res) =>{
  res.render('contact', {
    livsmedelsdata: ldata
  });
});*/

// Tip:
// Using a JSON-formatter plugin in your
// web-browser makes JSON easier to view:
// https://chrome.google.com/webstore/detail/json-formatter/bcjindcccaagfpapjjmafapmmgkkhgoa