const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname,'pets.json');


var animals;
try{
    animals = JSON.parse(fs.readFileSync('pets.json', 'utf8')); 
} catch(error){
    console.error(error)
    process.exit(1);
}

routes = { 
    '/pets': function(req, res) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(animals));
    } , 
    '/pets/0': function(req, res) {
        res.end(JSON.stringify(animals));
    },
    '/pets/1': function(req, res) {
        res.end(JSON.stringify(animals));
    }
};

for(var i = 1; i < animals.length; i++){
    routes[`/pets/${i}`]  = function(req, res){
        res.end(JSON.stringify(animals[i]))
    }
}


module.exports = routes;
