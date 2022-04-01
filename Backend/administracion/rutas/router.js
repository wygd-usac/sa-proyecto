const Router = require("express");
const router = Router();
const PersonaCtl = require("../controllers/PersonaCtl");

router.get("/", (req, res) => {
  res.send(
    "Modulo de Administración se actualiza solo, con los nuevos cambios"
  );
});

//Persona
router.post("/persona", PersonaCtl.create);
router.put("/persona", PersonaCtl.update);
router.put("/persona", PersonaCtl.updateUser);
router.get("/persona", PersonaCtl.findAll);
router.delete("/persona/", PersonaCtl.delete);

//Listas
router.get("/country", PersonaCtl.getCountrys);
router.get("/team", PersonaCtl.getTeams);
router.get("/stand", PersonaCtl.getStands);

module.exports = router;
