var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '115.28.168.72',
  user     : 'root',
  password : '930218',
  database : 'test'
});

exports.connection = connection;


