const Router = require('express');
const router = Router();

//middleware para validar rutas y permisos
const {validate_session,validate_premium} = require('../../middleware/validations');

router.get('/', (req, res) => {
    res.send("Modulo de Cliente");
});


router.get('/listar',validate_session, (req, res) => {
    res.send("Modulo de Cliente");
});



module.exports = router;