const conexion = require("./db");

function makeid(length) {
    var result           = '';
    var characters       = '0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

async function insertUser(
    name,
    last_name,
    password,
    email,
    phone,
    photo,
    gender,
    birth_date,
    address,
    id_Country,
    type
){
    try {
        const id_status = makeid(6);
        let query = `call InsertUsuario`+
            `('${name}','${last_name}', '${password}','${email}', '${phone}','${photo}', '${gender}', '${birth_date}','${address}' , '${id_status}', '${id_Country}','${type}');`;
        return await conexion.ejecutarInsercion(query);
    }catch(error){
        return false;
    }
}

async function deleteUser(id_person){
    try {
        let query = `call EliminarUsuario`+
            `('${id_person}');`;
        return await conexion.ejecutarInsercion(query);
    }catch(error){
        return false;
    }
}

async function updateUser(
    id_user,
    name,
    last_name,
    password,
    email,
    phone,
    photo,
    gender,
    birth_date,
    address,
    id_status,
    verify,
    membership,
    id_Country,
    type
){
    try {
        let query = `call UpdateUser`+
            `('${id_user}','${name}','${last_name}', '${password}','${email}', '${phone}','${photo}', '${gender}', '${birth_date}','${address}','${id_status}','${verify}', '${membership}', '${id_Country}', '${type}');`;
        return await conexion.ejecutarInsercion(query);
    }catch(error){
        return false;
    }
}

async function loginUser(email, password){
    try {
        let query = `call Login`+
            `('${email}','${password}');`;
        let result = await conexion.ejecutarQuery(query);
        return result[0];
    }catch(error){
        return false;
    }
}

async function getUser(id_user){
    try {
        let query = `call getUser`+
            `(${id_user});`;
        let result = await conexion.ejecutarQuery(query);
        return result[0];
    }catch(error){
        return false;
    }
}

async function confirmUser(email, code){
    try {
        let query = `call confirmEmail`+
            `('${email}','${code}');`;
        return await conexion.ejecutarInsercion(query);
    }catch(error){
        return false;
    }
}

module.exports.insertUser = insertUser;
module.exports.deleteUser = deleteUser;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.getUser = getUser;
module.exports.confirmUser = confirmUser;
