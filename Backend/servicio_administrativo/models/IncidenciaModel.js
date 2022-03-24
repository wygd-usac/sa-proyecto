const conexion = require("./db");
const Transferencia = require("./Transefer_LogModel");

async function insertIncidencia(descripcion, minuto, id_person, id_team, id_partido){
    try {
        let query = `call InsertIncidencia`+
            `('${descripcion}','${minuto}', '${id_person}', '${id_team}', '${id_partido}');`;
        return await conexion.ejecutarInsercion(query);
    }catch(error){
        return false;
    }
}

async function updateStateJugador(id_person, state){
    try {
        let query = `call UpdateStatePerson`+
            `('${id_person}','${state}');`;
        return await conexion.ejecutarInsercion(query);
    }catch(error){
        return false;
    }
}

async function insertNew(id_team, title, description, date, empleado){
    try {
        let query = `call InsertNoticia`+
            `('${description}','${id_team}', '${title}', '${date}', ${empleado});`;
        return await conexion.ejecutarInsercion(query);
    }catch(error){
        return false;
    }
}


async function getNoticias(team){
    try {
        let query = `call GetNoticia`+
            `(${team});`;
        let result = await conexion.ejecutarQuery(query);
        return result[0];
    }catch(error){
        return false;
    }
}


module.exports.insertIncidencia = insertIncidencia;
module.exports.updateStateJugador = updateStateJugador;
module.exports.insertNew = insertNew;
module.exports.getNoticias = getNoticias;
