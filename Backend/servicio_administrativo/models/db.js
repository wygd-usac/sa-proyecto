const mysql = require("mysql");

// Crear conexion
const connection = mysql.createConnection({
    host: '173.255.118.184',
    user: 'sa-proyecto',
    password : 'grupoH',
    port: 3306,
    database: 'sa'
});


connection.connect(error => {
  if (error) throw error;
  console.log("Base de datos conectada correctamente");
});
module.exports = connection;