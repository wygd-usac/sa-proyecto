const UserModal = require("../models/UserModal");
const axios = require("axios");
var nodemailer = require('nodemailer');

async function InsertUser(req, res, next){
    try {
        const name = req.body.name;
        const last_name = req.body.last_name
        const password = req.body.password
        const email = req.body.email
        const phone = req.body.phone
        const photo = req.body.photo
        const gender = req.body.gender
        const birth_date = req.body.birth_date
        const address = req.body.address
        const id_Country =req.body.id_Country
        const type = req.body.type

        let resultado = await UserModal.insertUser(
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
        );
        if(resultado){
            //traer data y actulizarla

            let helper = await UserModal.getUserForEmail(email);
            await new Promise(r => setTimeout(r, 2000));
            enviarCorreo(email,"Gracias por ser parte de SoccerStats, utiliza alguno de los enlaces para habilitar tu cuenta" +
                " http://localhost:5000/esb/usuario/confirm/?code=" + helper[0].id_status + " ó http://34.132.139.69:5000/esb/usuario/confirm/?code="
            + helper[0].id_status + " codigo: " + helper[0].id_status );
            res.status(200).json({msg:"registrado correctamente, revisa tu correo"});
        }else{
            res.status(400).json({msg:"error en el registro"});
        }
    }catch(error){
        res.status(400).json({msg:"error en el registro"});
    }
}

async function UpdateUser(req, res, next){
    try {
            const id_user  = req.body.id_user
            let name =  req.body.name
            let last_name = req.body.last_name
            let password =  req.body.password
            let email =  req.body.email
            let phone =  req.body.phone
            let photo =  req.body.photo
            let gender =  req.body.gender
            let birth_date =  req.body.birth_date
            let address =  req.body.address
            let id_status =  req.body.id_status
            let verify =  req.body.verify
            let membership =  req.body.membership
            let id_Country =  req.body.id_Country
            let type = req.body.type

        let helper = await UserModal.getUser(id_user);
            console.log(helper);
            if(helper instanceof Array){
                if(helper.length > 0){
                    if(comprobadorUndifined(helper[0].name, name)){
                        name = helper[0].name;
                    }
                    if(comprobadorUndifined(helper[0].lastname, last_name )){
                        last_name = helper[0].lastname;
                    }
                    if(comprobadorUndifined(helper[0].email, email)){
                        email = helper[0].email;
                    }
                    if(comprobadorUndifined(helper[0].telephone, phone)){
                        phone = helper[0].telephone;
                    }
                    if(comprobadorUndifined(helper[0].photo, photo)){
                        photo = helper[0].lastname;
                    }
                    if(comprobadorUndifined(helper[0].birthday, birth_date)){
                        const date = new Date(helper[0].birthday);
                        console.log("date:" + date);
                        birth_date = formatDate(date);
                    }
                    if(comprobadorUndifined(helper[0].address, address )){
                        address = helper[0].address;
                    }
                    if(comprobadorUndifined(helper[0].genre, gender)){
                        gender = helper[0].genre;
                    }
                    if(comprobadorUndifined(helper[0].verify, verify)){
                        verify = helper[0].verify;
                    }
                    if(comprobadorUndifined(helper[0].id_Country, id_Country)){
                        id_Country = helper[0].id_Country;
                    }
                    if(comprobadorUndifined(helper[0].membership, membership)){
                        membership = helper[0].membership;
                    }
                    if(comprobadorUndifined(helper[0].id_rol, type)){
                        type = helper[0].id_rol;
                    }
                    if(comprobadorUndifined(helper[0].id_status, id_status)){
                        id_status = helper[0].id_status;
                    }
                    if(comprobadorUndifined(helper[0].password, password)){
                        password = helper[0].password;
                    }
                }
            }else {
                res.status(400).json({msg:"error en la actualizacion"});
            }

        let resultado = await UserModal.updateUser(
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
        )
        if(resultado){
            res.status(200).json({msg:"actualizado correctamente"});
        }else{
            res.status(400).json({msg:"error en la actualizacion"});
        }
    }catch(error){
        res.status(400).json({msg:"error la actualizacion"});
    }
}

async function deleteUser(req, res, next){
    try {
        const id_user = req.body.id_user;
        let resultado = await UserModal.updateStateJugador(id_user, state);
        if(resultado){
            res.status(200).json({msg:"elimando correctamente"});
        }else{
            res.status(400).json({msg:"error en la actualizacion"});
        }
    }catch(error){
        res.status(400).json({msg:"error la actualizacion"});
    }
}

async function confirmUser(req, res, next){
    try {
        const code = req.query.code;
        let resultado = await UserModal.verifyUser(code);
        if(resultado){
            res.status(200).json(resultado);
        }else{
            res.status(400).json({msg:"error en la actualizacion"});
        }
    }catch(error){
        res.status(400).json({msg:"error la actualizacion"});
    }
}

async function getUser(req, res, next){
    try {
        let id_user = req.query.id;
        if(id_user === undefined){
            id_user = null;
        }
        let resultado = await UserModal.getUser(id_user);
        if(resultado){
            res.status(200).json(resultado);
        }else{
            res.status(400).json({msg:"error al obtener registros"})
        }
    }catch(error){
        res.status(400).json({msg:"error al obtener registros"})
    }
}


async function loginUser(req, res, next){
    try {
        let email = req.body.email;
        let password = req.body.password;

        let resultado = await UserModal.loginUser(email,password);
        if(resultado instanceof Array){

            const payload = {
                id_user:resultado["id_user"],
                id_rol:resultado["id_rol"],
                membership:resultado["membership"],
                email:resultado["email"]
            };

            axios.post('http://localhost:5001'+'/esb/jwt/register', payload).then(function (x) {
                if(x.data.token !== undefined && resultado[0] !== undefined){
                    console.log(x.data.token);
                    resultado[0].token = x.data.token;
                    res.status(200).json(resultado);
                }else {
                    res.status(400).json({msg:"error al obtener login"})
                }
            })

        }else{
            res.status(400).json({msg:"error al obtener login"})
        }
    }catch(error){
        res.status(400).json({msg:"error al obtener login"})
    }
}

function comprobadorUndifined(v1 , v2){
    return v1 !== undefined && v2 === undefined
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [month, day, year].join('/');
}

async function enviarCorreo(correo, texto){
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'sahproyecto@gmail.com',
            pass: 'sahproyecto_100'
        }

    });
    var mailOptions = {
        from: 'proyecto saH',
        to: correo,
        subject: 'SoccerStats',
        text: "Estimado usuario:  "+texto
    };
    await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Correo enviado");
        }
    });
}


module.exports.InsertUser = InsertUser;
module.exports.UpdateUser = UpdateUser;
module.exports.loginUser = loginUser;
module.exports.deleteUser = deleteUser;
module.exports.getUser = getUser;
module.exports.confirmUser = confirmUser;
