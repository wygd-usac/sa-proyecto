
const validate_session = function(req, res, next){
  const token = req.headers['authorization'];
  const jwt_service = 'jwt';
  const produccion = true;
  if (produccion) {
        //se valida que tiene sesion y se retornan valores del usuario
        var data = JSON.stringify({});
        var config = {
        method: 'post',
        url: `http://${jwt_service}:5001/validate`,
        headers: { 
            'authorization': token, 
            'Content-Type': 'application/json'
        },
        data : data
        };
        var axios = require('axios');
        axios(config)
        .then(function (response) {
        var decoded = response.data;
        if(decoded != undefined && decoded.valido){
            req.body.data = decoded.data;
            next();
        }else{
            
            res.send({
                status:400,
                msj:"El usuario no existe o no ha iniciado sessión."
            });
        }

        })
        .catch(function (error) {
        console.log(error);
        res.send({
          status:400,
          msj:"El usuario no existe o no ha iniciado sessión."
      });
        });
        
      } else { 
        req.body.data = {
                        "id_user": 5,
                        "id_rol": 3,
                        "membership": 0,
                        "email": "correo@gmail.com"  
                      };
        next();   
        //res.status(403).send(`Sorry but you are not an admin and you do not have access to route ${req.url}`);
      }
 }

 const validate_premium = function(req,res,next){
  next(); //comentar esta linea si se desea 
  //var isPremium = false;
  const {membership} = req.body.data;
  if(membership > 0){
    next();
  }else{
    res.status(403).send(`Sorry but you are not premium and you do not have access to route ${req.url}`);
  }
 }

 module.exports = {
   validate_session,
   validate_premium
  };
