const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const connection = require("./database");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//This is for call data from database.
app.get("/data", (req, res) => {
  let sqlGet = "SELECT * FROM CRUD_DB";
  connection.query(sqlGet, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.post("/data/post", (req, res) => {
  const { name, email, contact } = req.body;
  let sqlInsert = "INSERT INTO crud_db (name, email,contact) values (?, ?, ?)";
  connection.query(sqlInsert, [name, email, contact], (error, result) => {
    if (error) {
      console.log(error);
    }
  });
});

//This is for insert data to database

app.delete("/data/remove/:id", (req, res) => {
  const { id } = req.params;
  let sqlRemove = "DELETE FROM crud_db WHERE id = ?";
  connection.query(sqlRemove, id, (error, result) => {
    if (error) {
      console.log(error);
    }
  });
});

app.get("/data/get/:id", (req, res) => {
  const { id } = req.params;
  const sqlGet = "SELECT * FROM crud_db where id = ?";
  connection.query(sqlGet, id, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.put("/data/update/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, contact } = req.body;
  const sqlUpdate =
    "UPDATE  crud_db  SET name = ?, email = ?, contact = ?  WHERE id = ?";
  connection.query(sqlUpdate, [name, email, contact, id], (err, results) => {
    if (err) {
      console.log(err);
    }
    res.send(results);
  });
});

app.listen(5000, function () {
  console.log("Server is running on port 5000");
  connection.connect(function (err) {
    if (err) throw err;
    console.log("Database connected");
  });
});
