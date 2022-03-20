const executeQ = require('./connection');

async function getCountries(){
    var query = 'SELECT * FROM SA.Country;';
    const countries = await executeQ(query);
    const json_c = JSON.stringify(countries);
    //console.log(json_c);
    return json_c;
}

async function obtainMembership(id_client){
    
        const query = `UPDATE SA.Usuario SET membership = 1 WHERE id_user = ${id_client};`
        
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


function getResponse(code,message,data){
    return JSON.stringify({status:code,msj:message,data:data});
}
module.exports = {
    getCountries,
    obtainMembership,
    getResponse
}