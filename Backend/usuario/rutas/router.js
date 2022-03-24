const Router = require('express');
const router = Router();

//middleware para validar rutas y permisos
const {validate_session,validate_premium} = require('../../middleware/validations');
const userCtl = require("../controllers/UserCtl");

//los endpoints aqui

router.get('/', (req, res) => {
    res.send("Modulo de Usuario");
});

//Estadio
router.post("/add", userCtl.InsertUser);
router.post("/update", userCtl.UpdateUser);
router.get("/login", userCtl.loginUser);

module.exports = router;
