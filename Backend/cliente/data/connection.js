const mysql = require('mysql');

const conexion = mysql.createPool({
    host: '34.72.212.208',
    user: 'grupoH',
    password: 'sagh-2022',
    database: 'sa'
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