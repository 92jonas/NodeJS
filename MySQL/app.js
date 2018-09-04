const express = require('express');
const mysql = require('mysql');

const app = express();

var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodemysql'
});

// Connect
db.connect((err) => {
    if (err) throw err;
    console.log("Connected to nodemysql...");
});

// Create DB
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE nodemysql';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('database created...');
        console.log(req.params.name + " created...");
    });
});

// Create table
app.get('/createuserstable', (req, res) => {
    let sql = 'CREATE TABLE users(id int AUTO_INCREMENT, name VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Users table created')
    });
});

// Add user
app.get('/adduser/:name', (req, res) => {
    let post = {
        name: req.params.name
    };
    let sql = 'INSERT INTO users SET ?';
    db.query(sql, post, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('User ' + req.params.name + ' added to db');
    });
});


app.listen('3000', () => {
    console.log("Server started on port 3000");
});