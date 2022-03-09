"use strict";
const express = require("express");
const app = express();
app.use(express.json());
let fs = require("fs");

app.
route("/pets/:index")
.get( (req, res) => {
  const { index } = req.params;
    fs.readFile("pets.json", "utf8", (err, data) =>{
      if(err){
        res.status(500)
      }else{
        if (!JSON.parse(data)[index]) {
          notFound(res);
          return;
        }
        res.status(201).send(JSON.parse(data)[index]);
      }
    });
})

app
  .route("/pets")
  .get((req, res) => {
    fs.readFile("pets.json", "utf8", (err, data) =>{
      if(err){
        res.status(500)
      }else{
        res.status(201).send(data);
      }
    });
  })
  .post((req, res) => {
    let bodyKeys = ["age", "name", "kind"];
    if (
      typeof req.body.age !== "number" ||
      !bodyKeys.every((key) => Object.keys(req.body).includes(key))
    ) {
      res.status(400).send('Bad Request');
    } else {
      const newPet = { 
        age: req.body.age, 
        name: req.body.name, 
        kind: req.body.kind
      };

      fs.readFile("pets.json", "utf8", (err, data) =>{
        parsedData = JSON.parse(data);
        parsedData.push(newPet);
      fs.writeFile("pets.json", JSON.stringify(parsedData), (error) => {
        if (error){
          res.status(500).send();
        } else {
          res.status(201).send(newPet);
        }
      });
    });
  }
});

function notFound(res) {
  res.status(404);
  res.send("Not found");
}
//age kind name
app.listen(8000, () => {
  console.log("Server is running");
});

module.exports = app;
