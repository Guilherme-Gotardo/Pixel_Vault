const mysql = require('mysql');

var pool = mysql.createPool({
    "user": "root",
    "password": "Guigo0135122000@",
    "database": "mydb",
    "host": "localhost",
    "port": 3306
});

exports.pool = pool;