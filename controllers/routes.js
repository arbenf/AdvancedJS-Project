let mongoose = require('mongoose');

//Connect to database
mongoose.connect('mongodb://ReceptNaringData:data123@ds137003.mlab.com:37003/recept', { useNewUrlParser: true });


//Create a schema
let receptSchema = new mongoose.Schema({
    name: String,
    persons: Number,
    instructions: [String],
    ingredients: [
      {
        name: String,
        units: Number,
        measuringUnit : String,
        unitEquivalentInGrams: Number
      }
    ],
    urlToImg : String
});

let Recept = mongoose.model('Recept', receptSchema);
//save to database
/*let omelett = Recept({
        name: "Omelett",
        persons: 4,
        instructions: [
          "Knäck äggen",
          "Krydda äggsmeten med salt m.m.",
          "Vispa äggen",
          "Stek smeten",
          "Lägg på tallrik"
        ],
        ingredients: [
          {
            name: "ägg",
            units: 6,
            measuringUnit : "st",
            unitEquivalentInGrams: 60
          }
        ],
        urlToImg : "/www/assets/omelett.jpg"
      }).save(function(err){
          if(err) throw err;
          console.log('recept saved');
      });*/

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
        if(req.query.search){
            const regex = new RegExp(escapeRegex(req.query.search), 'gi');
            Recept.find({name:regex}, function(err, data){
                if(err){
                    throw err;
                } 
                else{
                    res.render('index', {
                        recept: data,
                    });
                }
            }); 
        }
        else{
             //find all in database
            Recept.find({}, function(err, data){
                if(err) throw err;
                res.render('index', {
                    recept: data,
                });
            }); 
        }
    });


    /*app.post('/recept', urlEncodedParser, (req, res)=>{
        recept.push(req.body);
        res.json(recept);
    });*/

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

    function escapeRegex(text) {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    };

};