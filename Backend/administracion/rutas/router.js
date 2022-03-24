const Router = require('express');
const router = Router();
const {validate_session,validate_premium} = require('../middleware/validations');
//middleware para validar rutas y permisos
const {validate_session,validate_premium} = require('../../middleware/validations');

router.get('/', (req, res) => {
    res.send("Modulo de Administración");
});




module.exports = router;