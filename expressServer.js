"user strict";
const express = require("express");
const app = express();
app.use(express.json());
let fs = require("fs");

try {
  var animals = JSON.parse(fs.readFileSync("pets.json", "utf8"));
} catch (error) {
  console.error(error);
}

app.get("/pets/:index", (req, res) => {
  let index = req.params.index;
  if (!JSON.stringify(animals[index])) {
    notFound(res);
    return;
  } else {
    res.json(animals[index]);
  }
});

app
  .route("/pets")
  .get((req, res) => {
    res.json(animals);
  })
  .post((req, res) => {
    let bodyKeys = ["age", "name", "kind"];
    //console.log(req.body.age)
    if(typeof req.body.age !== "number" ||
    !bodyKeys.every((key) => Object.keys(req.body).includes(key))){
      res.status(400);
      res.end();
    }else{
      console.log('here');
      // animals.push(req.body);
      // fs.writeFileSync("pets.json", JSON.stringify(animals), (error) => {
      //   if (error) throw error;
      res.send('Added');
      };
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