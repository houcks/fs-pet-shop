"use strict";
const express = require("express");
const app = express();
app.use(express.json());
let fs = require("fs");
const { Pool } = require("pg");

const pool = new Pool({
  database: "petshop",
});

app
  .route("/pets/:index")
  .get((req, res) => {
    const { index } = req.params;
    pool.query("SELECT * FROM pets WHERE id=$1", [index], (err, result) => {
      res.status(201).send(result.rows[0]);
    });
  })
  .patch((req, res) => {
    const { index } = req.params;
    const { age, name, kind } = req.body[0];
    pool.query(
      `UPDATE pets SET 
        age = COALESCE($1, age), 
        name = COALESCE($2, name), 
        kind = COALESCE($3, kind) 
        WHERE id=$4 
        RETURNING *`, [age, name, kind, index], (err,result) =>{
            res.send(result.rows[0])
        }
    );   
  })

  .delete((req, res) => {
    const { index } = req.params;
    pool.query("DELETE FROM pets WHERE id=$1", [index], (err, result) => {
      res.status(201).send();
    });
  });

app
  .route("/pets")
  .get((req, res) => {
    pool.query("SELECT * FROM pets", (err, result) => {
      if (err) {
        res.status(500);
        res.send();
      }
      res.status(201).json(result.rows);
    });
  })
  .post((req, res) => {
    const { age, name, kind } = req.body[0];
    pool.query(
      "INSERT INTO pets (age, name, kind) VALUES ($1, $2, $3) RETURNING *",
      [age, name, kind],
      (err, result) => {
        res.send(result.rows[0]);
      }
    );
  });

//age kind name
app.listen(8000, () => {
  console.log("Server is running");
});

module.exports = app;