const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;
const cors = require('cors');
const context = '/esb/jwt';
//const router = require('./rutas/router');
const {executeQ,executeEPLogin} = require('./config/connection');
app.use(cors());
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json({ extended: true, limit: '10mb' }));
//app.use(context, router);
app.listen(port, () => console.log(`${port}...`));

app.post('/esb/jwt/login', async  (req, res) => {
    console.log("hola");
    var {email,password} = req.body;

    var query = `SELECT id_user, name , lastname , id_rol,membership 
    From Usuario u 
    Where email = '${email}'
    And password = '${password}';`;
    try{
        var result = await executeQ(query);
        if(result.length > 0){
            const payload = {
                id_user:result[0].id_user,
                name:result[0].name ,
                lastname :result[0].lastname,
                id_rol:result[0].id_rol,
                membership: result[0].membership
                };
                console.log(payload);
                const token = jwt.sign(payload, 'contrasenia12345678', {
                            expiresIn: 1440
                        });
                        console.log(token);
            res.json({
                status:200,
                msj: 'Autenticación correcta',
                token: token
            });
        }else{
            res.send({status:400,msj:"No se pudo validar el usuario",data:''});
        }
    }catch(e){
        res.send(JSON.stringify(e));
    }

});