const Router = require("express");
const router = Router();
const PersonaCtl = require("../controllers/PersonaCtl");

const {validate_session,validate_premium} = require('../middleware/validations');
//middleware para validar rutas y permisos
const {
  validate_session,
  validate_premium,
} = require("../../middleware/validations");

router.get("/", (req, res) => {
  res.send("Modulo de Administración");
});

//Persona
router.post("/persona", PersonaCtl.create);
router.put("/persona", PersonaCtl.update);
router.put("/persona", PersonaCtl.updateUser);
router.get("/persona", PersonaCtl.findAll);
router.delete("/persona/", PersonaCtl.delete);

module.exports = router;
