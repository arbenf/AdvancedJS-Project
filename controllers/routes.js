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
        category: String,
        units: Number,
        measuringUnit : String,
        unitEquivalentInGrams: Number
      }
    ],

    urlToImg : String
});

let Recept = mongoose.model('Recept', receptSchema);
//save to database
/*let pizza = Recept({
        name: "Pizza",
        persons: 4,
        instructions: [
          "Baka deg",
          "Bre på ketchup",
          "lägg på toppings",
          "lägg på ost",
          "grädda"
        ],
        ingredients: [
          {
            name: "vetemjöl",
            units: 6,
            measuringUnit : "gram",
            unitEquivalentInGrams: 60
          }
        ],
        urlToImg : "/www/assets/pizza.jpg"
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
    app.get('/', (req, res)=>{
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

    app.get('/recipefilterByCategories', (req, res) => {
        if(req.query.search){
            const regex = new RegExp(escapeRegex(req.query.search), 'gi');
            Recept.find({category:regex}, function(err, data){
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