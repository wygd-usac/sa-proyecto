const mysql = require('mysql');

const conexion = mysql.createPool({
    host: 'localhost',
    user: 'admin',
    password: '1234',
    database: 'SA'
});

executeQ = (consulta) => {
    return new Promise((resolve, reject) => {
        conexion.query(consulta, (error, elements) => {
            if (error) {
                return reject(error);
            }
            return resolve(elements);
        });
    });
};

module.exports = executeQ;