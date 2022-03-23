const mysql = require("mysql");

// Crear conexion
const connection = mysql.createConnection({
    host: '34.72.212.208',
    user: 'grupoH',
    password : 'sagh-2022',
    port: 3306,
    database: 'sa'
});

connection.connect(error => {
  if (error) throw error;
  console.log("Base de datos conectada correctamente");
});

function ejecutarQuery(query){
    console.log(query)
    return new Promise(async (resolve, reject) =>{
        try{
            connection.query(query,function(err, data, fields){
                if(err){
                    console.log("error:", err);
                    resolve (false);
                }
                resolve(data)
            })
        }catch(error){
            resolve(false);
        }
    })
}

function ejecutarInsercion(query){
    console.log(query)
    return new Promise(async (resolve, reject) =>{
        try{
            connection.query(query,function(err, data, fields){
                if(err){
                    console.log("error:", err);
                    resolve(false);
                }
                resolve(true)
            })
        }catch(error){
            resolve(false);
        }
    })
}

module.exports = connection;
module.exports.ejecutarQuery = ejecutarQuery;
module.exports.ejecutarInsercion = ejecutarInsercion;
