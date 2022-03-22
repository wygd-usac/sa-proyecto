const executeQ = require('./connection');

async function getCountries(){
    var query = 'SELECT * FROM Country;';
    const countries = await executeQ(query);
    const json_c = JSON.stringify(countries);
    //console.log(json_c);
    return json_c;
}

async function obtainMembership(id_client){
    
        const query = `UPDATE Usuario SET membership = 1 WHERE id_user = ${id_client};`;
        try{
            const result = await executeQ(query);
            if(result.affectedRows == 1){
                return {status:200,msj:"Ahora cuenta con una membresia."};
            }
        }catch(error){
            console.log(error);
            return {status:400,msj:"Error al obtener membresia."};
        }
}


async function followTeam(id_client,id_team){
    const query = `INSERT INTO Equipos_Seguidos ( id_usuario, id_team )    
    VALUES (${id_client},${id_team});`;

    try{
        const result = await executeQ(query);
        if(result.affectedRows == 1){
            return {status:200,msj:"Ahora estas siguiendo al equipo."};
        }
    }catch(error){
        console.log(error);
        return {status:400,msj:"Error al seguir al equipo."};
    }
}

function getResponse(code,message,data){
    return JSON.stringify({status:code,msj:message,data:data});
}
module.exports = {
    getCountries,
    obtainMembership,
    followTeam,
    getResponse
}