app.post('/login', (req, res) => {
    var user = users.find(function(user,index){
        if(req.body.user === user.user && req.body.password === user.password && req.body.type === user.type)
            return true;
    });
    if(user){
        console.log("<InicioSesion>El usuario '"+req.body.user+"' ha iniciado sesión");
        const payload = {
            id:user.id,
            user:user.user,
            type:user.type
        };
        const token = jwt.sign(payload, app.get('llave'), {
            expiresIn: 1440
        });
        res.json({
            mensaje: 'Autenticación correcta',
            token: token
        });
    }else{
        res.json({ mensaje: "Usuario o contraseña incorrectos"});
    }
});