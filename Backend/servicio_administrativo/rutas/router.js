const Router = require('express');
const router = Router();
const estadioCtl = require('../controllers/StadiumCtl');

//middleware para validar rutas y permisos
const {validate_session,validate_premium} = require('../../middleware/validations');
const { getAll } = require('../models/StadiumModel');

router.get('/', (req, res) => {
    res.send("Modulo de Servicios Administrativos");
});

//Estadio 
router.post("/stadium", estadioCtl.create);
router.put("/stadium", estadioCtl.update);
router.delete("/stadium/", estadioCtl.delete);
router.get("/stadium",estadioCtl.findAll);

module.exports = router;