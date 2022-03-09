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
    pool.query("SELECT * FROM pets WHERE id=$1", [index])
    .then((result) => {
        if(result.rowCount === 0){
            res.sendStatus(404);
        }
        res.send(result.rows[0]);
    })
    .catch((error) => {
        res.sendStatus(500);
    })
  })
  .patch((req, res) => {
    const { index } = req.params;
    const { age, name, kind } = req.body[0];
    pool
        .query(
            `UPDATE pets SET 
            age = COALESCE($1, age), 
            name = COALESCE($2, name), 
            kind = COALESCE($3, kind) 
            WHERE id=$4 
            RETURNING *`, [age, name, kind, index])
        .then((result) => {
            if(result.rowCount === 0){
                res.sendStatus(404);
            }
            res.send(result.rows[0])
        })
        .catch((err) => {
            res.sendStatus(500)
        })
  })
  .delete((req, res) => {
    const { index } = req.params;
    pool
    .query("DELETE FROM pets WHERE id=$1 RETURNING *", [index])
    .then((result) => {
        if(result.rowCount === 0){
            res.sendStatus(404);
        }
        res.send();
    })
    .catch((err) => {
        res.sendStatus(500);
    })
  });

app
  .route("/pets")
  .get((req, res) => {
    pool
    .query("SELECT * FROM pets")
    .then((result) => {
        res.send(result.rows);
    })
    .catch((err) => {
        res.sendStatus(500);
    })
  })
  .post((req, res) => {
    const { age, name, kind } = req.body[0];
    pool
    .query(
      `INSERT INTO 
      pets (age, name, kind) 
      VALUES ($1, $2, $3) 
      RETURNING *`,
      [age, name, kind])
    .then((result) => {
        res.send(result.rows[0]);
    })
    .catch((err) => {
        res.sendStatus(500);
    })
  });

//age kind name
app.listen(8000, () => {
  console.log("Server is running");
});

module.exports = app;