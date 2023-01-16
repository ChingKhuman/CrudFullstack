var mysql2 = require("mysql2");

var connection = mysql2.createConnection({
  host: "localhost",
  database: "curd",
  user: "root",
  password: "rootpassword@123",
});

module.exports = connection;
