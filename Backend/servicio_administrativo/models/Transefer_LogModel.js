const conexion = require("./db");

async function getTransferencias(){
    try {
        let query = `call getTrans();`;
        let result = await conexion.ejecutarQuery(query);
        return result[0];
    }catch(error){
        return false;
    }
}


module.exports.getTransferencias = getTransferencias;

