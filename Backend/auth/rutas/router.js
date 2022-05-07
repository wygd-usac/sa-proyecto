const Router = require('express');
const router = Router();
const dataOp = require('../data/dataOp');
const axios = require("axios");
//middleware para validar rutas y permisos
const {validate_session,validate_premium,alive} = require('../middleware/validations');
const {response} = require("express");


router.post('/temporal-password',(req,res)=>{

    axios.post('http://usuario:5000'+'/esb/usuario/restablecer', req.body).then(function (x) {
        try{
            res.send(
                x.data
            )
        }catch (e) {
            res.send(
                {
                    status: 400,
                    msg: "Error al verificar correo.",
                    data: []
                }
            )
        }
    }).catch((error) => {
        res.status(200).json(
            {
                status: 400,
                msg: "Error al verificar correo.",
                data: []
            }
        );
        console.log(error);
    })
})


router.post('/reset-password',(req,res)=>{

    axios.post('http://usuario:5000'+'/esb/usuario/update', {email: req.body.email, password: req.body.new_password}).then(function (x) {
        try{
            res.send(
                x.data
            )
        }catch (e) {
            res.send(
                {
                    status: 400,
                    msg: "Error al actualizar usuario",
                    data: []
                }
            )
        }
    }).catch((error) => {
        res.status(200).json(
            {
                status: 400,
                msg: "Error al actualizar usuario",
                data: []
            }
        );
        console.log(error);
    })
})

router.get('/', (req, res)=>{
    axios.post('http://usuario:5000'+'/esb/usuario/update', {id_user: req.query.id, verify: 1}).then(function (x) {
        try{
            res.send(
                    x.data
            )
        }catch (e) {
            res.send(
                {
                    status: 400,
                    msg: "Error al verificar correo.",
                    data: []
                }
            )
        }
    }).catch((error) => {
        res.status(200).json(
            {
                status: 400,
                msg: "Error al actualizar.",
                data: []
            }
        );
        console.log(error);
    })
});

router.post('/',(req,res)=>{

    axios.post('http://usuario:5000'+'/esb/usuario/login', req.body).then(function (x) {
        try{
            res.send(
                {
                    status: 200,
                    msg: "",
                    data: {
                        token: x.data[0].token,
                        id_status: 1,
                        id_rol: x.data[0].id_rol,
                        id_user: x.data[0].id_user,
                        has_membership: x.data[0].membership
                    }
                }
            )
        }catch (e) {
            res.send(
                {
                    status: 400,
                    msg: "Error de autenticación.",
                    data: []
                }
            )
        }
    }).catch((error) => {
        res.status(200).json(
            {
                status: 400,
                msg: "Error de autenticación.",
                data: []
            }
        );
        console.log(error);
    })

});





module.exports = router;
