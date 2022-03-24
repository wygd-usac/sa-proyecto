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

async function getNotifications(id_team){
    const query = `Select e.id_team , e.name , n.id_new  from Equipo e 
    Join Noticia n 
    On e.id_team  = n.Equipo_id_team
    Where e.id_team = ${id_team};`;

    try{
        const result = await executeQ(query); 
        
            return {status:200,msj:"Se envia las notificaciones.",data:result};
        
    }catch(error){
        console.log(error);
        return {status:400,msj:"Error al seguir al equipo.",data:[]};
    }
}




async function setQuinielaResult(id_game,id_client,result_1,result_2){
    const query = `INSERT INTO QuinielaDetail
    (id_quiniela, id_client, result_1, result_2)
    SELECT q.id,${id_client},${result_1},${result_2} From Quiniela q
    WHERE id_partido = ${id_game};`;

    try{
        const result = await executeQ(query); 
        if(result.affectedRows == 1){
            return {status:200,msj:"Estado de la quiniela actualizada.",data:[]};
        }
    }catch(error){
        console.log(error);
        return {status:400,msj:"Error al seguir al equipo.",data:[]};
    }
}

async function getTeamPersons(id_team){
    const query = `SELECT p.id_person, p.name, p.lastname, 
    p.photo, p.status as 'type', p.id_team, e.name 
    FROM Person p Join Equipo e On e.id_team = p.id_team 
    WHERE p.id_team=${id_team};`;

    try{
        const result = await executeQ(query); 
        
        return {status:200,msj:"Se devolvio los integrantes del equipo.",data:result};
        
    }catch(error){
        console.log(error);
        return {status:400,msj:"Error al seguir al equipo.",data:[]};
    }
}




function getResponse(code,message,data){
    return JSON.stringify({status:code,msj:message,data:data});
}
module.exports = {
    getCountries,
    obtainMembership,
    followTeam,
    getResponse,
    getNotifications,
    setQuinielaResult,
    getTeamPersons
}