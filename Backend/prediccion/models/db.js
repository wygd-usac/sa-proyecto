const mysql = require("mysql");

// Crear conexion
const connection = mysql.createConnection({
  host: "34.72.212.208",
  user: "grupoH",
  password: "sagh-2022",
  port: 3306,
  database: "sa",
});

connection.connect((error) => {
  if (error) throw error;
  console.log("Base de datos conectada correctamente");
});
module.exports = connection;
