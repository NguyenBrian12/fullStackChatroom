const mysql = require("mysql");
const toCamel = require("./toCamel.js");
const db = mysql.createConnection({
  host: "chatapp.cfcexvxysb4w.us-west-1.rds.amazonaws.com",
  user: "nguyenbrian12",
  password: "briannn1",
  database: "nguyenbrian12",
  port: 3306
});
const ValidateBody = require("../filters/validate.body");
const IgnChat = require("../models/ignChat");
const router = require("express").Router();
module.exports = router;
router.get("/createdb", (req, res) => {
  let sql = "CREATE DATABASE chatapp";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("db created");
  });
});
router.get("/:appUserId(\\d+)", (req, res) => {
  let post = {
    AppUserId: req.params.appUserId
  };
  let sql = `SELECT * FROM chatroom WHERE AppUserId = ${req.params.appUserId}`;
  db.query(sql, post, (error, results) => {
    if (error) {
      return console.error(error.message);
    }
    res.status(201).json(toCamel(results));
  });
});
router.get("/getAllMessages", (req, res) => {
  let sql = `SELECT * FROM chatroom`;
  db.query(sql, (error, results) => {
    res.status(201).json(toCamel(results));
  });
});
router.post("/insertMessage", ValidateBody(IgnChat), (req, res) => {
  let post = {
    AppUserId: req.model.appUserId,
    Message: req.model.message,
    DateCreated: new Date(),
    DateModified: new Date()
  };
  let sql = "INSERT INTO chatroom SET ?";
  db.query(sql, post, (error, results) => {
    res.status(201).json(results);
  });
});
router.delete("/:id(\\d+)", (req, res) => {
  let post = {
    Id: req.params.id
  };
  let sql = `DELETE FROM chatroom WHERE Id = ${req.params.id}`;
  db.query(sql, post, (error, results) => {
    if (error) {
      return console.error(error.message);
    }
    res.status(201).json(results);
  });
});
