var mysql = require('mysql');
var conexion = mysql.createConnection({
	host: 'localhost', 
	user: 'root',
   	password: '',
	database: 'tpi'
});

conexion.connect(function(error) {
	if (error) throw error;
	console.log("conectado a DB");
});

module.exports = conexion;