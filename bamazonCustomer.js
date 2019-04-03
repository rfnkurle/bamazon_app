
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

// function to query from mysql database, array to cycle through and display products
function start() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log("");
        console.log("-----Welcome to Bamazon. Get Excited--------");
        console.log("");
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].id + " | " + res[i].product_name + " | In: " + res[i].department_name + " | Buy It Now!  $" + res[i].price + " | In Stock: " + res[i].stock_quantity);
            console.log("");
        };
        // inquirer prompt that asks what customer wishes to buy and then validates their response
        // by requiring that the ID# be less than or equal to 10, which is the number 
        // of purchase options, then takes in the quantity # they wish to by.
        inquirer.prompt([
            {
                type: "input",
                name: "ID",
                message: "What is the ID# of the product you wish to buy?",
                validate: function (value) {
                    if (isNaN(value) === false && parseInt(value) > 0 && parseInt(value) <= 10) {
                        return true;
                    }
                    return false;
                }

                
            }, {
                type: "input",
                name: "quantity",
                message: "Quantity to purchase:",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
            // function that takes customer inputs from inquirer 
        ]).then(function (response) {
            var purchase = parseInt(response.ID) - 1;
            var quantityPurchased = response.quantity;
            var purchaseTotal = (res[purchase].price) * quantityPurchased;
            
            // checks to see if stock quantity is sufficient and shouts at customer if not. 
        if (res[purchase].stock_quantity <= quantityPurchased){
            console.log("");
            console.log("Insufficient stock fill this order. Sorry for the inconconvenience. We hope you continue shopping at Bamazon.")
            console.log("");
            // start();
            connection.end();
            
            // If sufficient quantity of item is in stock, shows customer their total cost, sends them on their way.
            } else if (res[purchase].stock_quantity >= quantityPurchased) {
            
                
                connection.query("UPDATE products SET ?  WHERE ?", [
                    { stock_quantity: (res[purchase].stock_quantity - quantityPurchased) 
                    },
                    {
                        id: res[purchase].id
                    }],
                    function (err, res) {
                        if (err) throw err;
                        console.log("");
                        console.log("Purchase total: $" + purchaseTotal + "! Your item(s) will ship in 11-19 weeks. Thank you for shopping at Bamazon. NO REFUNDS.");
                        console.log("");
                        connection.end();
                        
                    });
               
             } 
             
          

        });
        
    })
};





start();
