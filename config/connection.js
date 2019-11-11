var express = require("express");
var path = require("path");
var mysql = require("mysql");
var connection;
var PORT = process.env.PORT || 8080;
/* SQL DB CONNECT AND EXPORT CONNECTION */
if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Lisinopril1!",
    database: "test_data"
  });
}
// connection.connect(function(err) {
//     if (err) {
//       console.error("error connecting: " + err.stack);
//       return;
//     }
//     console.log("connected as id " + connection.threadId);
//   });
module.exports = connection;

