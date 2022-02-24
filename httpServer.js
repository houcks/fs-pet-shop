'user strict';

const http = require('http');
const port = process.env.PORT || 8000;
const fs = require('fs');
const pets = ('pets.json');

const petRegExp = /^\/pets\/(.*)$/;

var server = http.createServer((req,res) => {
    let animals = JSON.parse(fs.readFileSync('pets.json', 'utf8')); 
    if(req.method === 'GET' && petRegExp.test(req.url)){
        let index = req.url.match(petRegExp)[1];
        if(!JSON.stringify(animals[index])){
            console.log(JSON.stringify(animals[index]))
            notFound(res);
            return;
        } else{
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(animals[index]));

        }
    } else if(req.method === 'GET' && req.url === "/pets"){
        
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(animals));
    } else{
        notFound(res);
        return;
    }   
});


server.listen(port, () =>{
    console.log('Listening on port', port);
});

module.exports = server;

function notFound(res){
    res.setHeader('Content-Type', 'text/plain');    
    res.statusCode = 404;
    res.end('Not found');
}