const validate_session = function(req, res, next){
    const token = req.headers['authorization'];
     if (true) {
       //se valida que tiene sesion y se retornan valores del usuario

      next();
    } else {
      /*res.send({ 
          mensaje: 'Token no proveída.' 
      });*/

      
      res.status(403).send(`Sorry but you are not an admin and you do not have access to route ${req.url}`);
    }
 }

 const validate_premium = function(req,res,next){
  var isPremium = false; 
  if(isPremium){
    next();
  }else{
    res.status(403).send(`Sorry but you are not premium and you do not have access to route ${req.url}`);
  }
 }

 module.exports = {
   validate_session,
   validate_premium
  };