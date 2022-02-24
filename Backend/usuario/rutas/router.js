const Router = require('express');
const router = Router();

//middleware para validar rutas y permisos
const {validate_session,validate_premium} = require('../../middleware/validations');

//los endpoints aqui

router.get('/', (req, res) => {
    res.send("Modulo de Usuario");
});

module.exports = router;