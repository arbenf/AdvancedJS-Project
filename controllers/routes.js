
const fs = require('fs');

let bodyParser = require('body-parser');

let urlEncodedParser = bodyParser.urlencoded({extended: false});

const ldata = JSON.parse(
    fs.readFileSync('./json/livsmedelsdata.json')
  );

const recept = JSON.parse(
    fs.readFileSync('./json/recept/omelett.json')
  );

let newRecipe = JSON.parse(
    fs.readFileSync('./json/recept/newRecipe.json')
  );  
  
module.exports = function(app){

    //Routes for index page
    app.get('/recept', (req, res)=>{
        let searchWord = req.query;
        res.render('index', {
            recept: recept,
            searchWord: searchWord
        });
    });

    app.post('/recept', urlEncodedParser, (req, res)=>{
        recept.push(req.body);
        res.json(recept);
    });

    //----------------------------------

    //Routes for Admin page
    app.get('/admin', (req, res) => {
        res.render('admin', {
            data: newRecipe
        });
    });

    app.post('/admin', urlEncodedParser, (req, res)=>{
        newRecipe.push(req.body);
        res.json(newRecipe);
    });
};