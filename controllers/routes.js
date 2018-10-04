
const fs = require('fs');

let bodyParser = require('body-parser');
let urlEncodedParser = bodyParser.urlencoded({extended: false});
//let jsonParser = bodyParser.json();

const ldata = JSON.parse(
    fs.readFileSync('./json/livsmedelsdata.json')
  );

const recept = JSON.parse(
    fs.readFileSync('./json/recept/omelett.json')
  );
  
module.exports = function(app){

    app.get('/recept', (req, res)=>{
        res.render('index', {
            data: recept
        });
    });

    app.post('/recept', urlEncodedParser, (req, res)=>{
        recept.push(req.body);
        res.json(recept);
    });

    app.delete('/recept', (req, res)=>{
        
    });

    app.get('/admin', (req, res) => {
        res.render('admin');
    });
};