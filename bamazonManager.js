var mysql = require("mysql");
var inquirer = require("inquirer");
// creating connection with mysql database "bamazon_db"
var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    // console.log("connected as id: " + connection.threadId);
});
