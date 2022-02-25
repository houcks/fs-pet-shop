"user strict";

const http = require("http");
const port = process.env.PORT || 8000;
const fs = require("fs");
const { system } = require("nodemon/lib/config");

const petRegExp = /^\/pets\/(.*)$/;

var server = http.createServer((req, res) => {
  let animals = JSON.parse(fs.readFileSync("pets.json", "utf8"));
  if (req.method === "GET" && petRegExp.test(req.url)) {
    let index = req.url.match(petRegExp)[1];
    if (!JSON.stringify(animals[index])) {
      notFound(res);
      return;
    } else {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(animals[index]));
    }
  } else if (req.method === "GET" && req.url === "/pets") {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(animals));
  } else if (req.method === "POST" && req.url === "/pets") {
    let body = "";
    req.on("data", (data) => {
      body += data;
    });

    req.on("end", () => {
      let bodyKeys = ["age", "name", "kind"];

      if (
        !typeof JSON.parse(body).age !== "number" ||
        !bodyKeys.every((key) => Object.keys(JSON.parse(body)).includes(key))
      ) {
        res.setHeader("Content-Type", "text/plain");
        res.statusCode = 400;
        res.end();
      } else {
        res.setHeader("Content-Type", "application/json");
        fs.writeFileSync("pets.json", JSON.stringify(animals), (error) => {
            if (error) throw error;
        });
        animals.push(JSON.parse(body));
        res.end();
      }
    });
  } else {
    notFound(res);
    return;
  }
});

server.listen(port, () => {
  console.log("Listening on port", port);
});

function notFound(res) {
  res.setHeader("Content-Type", "text/plain");
  res.statusCode = 404;
  res.end("Not found");
}
