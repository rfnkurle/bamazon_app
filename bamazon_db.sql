CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products
(id INT AUTO_INCREMENT NOT NULL,
product_name VARCHAR (50),
department_name VARCHAR (50),
price INT,
stock_quantity INT,
PRIMARY KEY (id)
);

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("Super Nintendo", "Video Games", 50, 100),
        ("Sega Genesis", "Video Games", 55, 50),
        ("Playstation", "Video Games", 100, 40),
        ("EASTON TPX Bat", "Sports", 60, 20),
        ("Louisville Slugger Bat", "Sports", 30, 15),
        ("Star Wars Complete DVD Collection", "Entertainment", 35, 25),
        ("LOTR DVD Collection", "Entertainment", 25, 20),
        ("New Brain, Extra Seratonin", "Health", 200, 5),
        ("Dopamine", "Health", 20, 100),
        ("Apache Helicopter", "Militaria", 100, 110);

    SELECT * FROM products;