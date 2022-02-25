"user strict";
const express = require("express");
const app = express();
app.use(express.json());

let fs = require("fs");
const petRegExp = /^\/pets\/(.*)$/;
try {
  var animals = JSON.parse(fs.readFileSync("pets.json", "utf8"));
} catch (error) {
  console.error(error);
}

app.get(petRegExp, (req, res) => {
  let index = req.url.match(petRegExp)[1];
  if (!JSON.stringify(animals[index]) || req.url.match(petRegExp)[1] === null) {
    notFound(res);
    return;
  } else {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(animals[index]));
  }
});

app
  .route("/pets")
  .get((req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(animals));
  })
  .post((req, res) => {
    let animals = JSON.parse(fs.readFileSync("pets.json", "utf8"));
    animals.push(req.body);
    fs.writeFileSync("pets.json", JSON.stringify(animals), (error) => {
      if (error) throw error;
    });
    res.send("some");
    res.end();
  });

function notFound(res) {
  res.setHeader("Content-Type", "text/plain");
  res.statusCode = 404;
  res.end("Not found");
}
//age kind name
app.listen(8000, () => {
  console.log("Server is running");
});

module.exports = app;
