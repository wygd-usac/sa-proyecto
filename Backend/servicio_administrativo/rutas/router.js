const Router = require('express');
const router = Router();
const estadioCtl = require('../controllers/StadiumCtl');
const teamCtl = require('../controllers/TeamCtl');
const soccerGameCtl = require('../controllers/Soccer_GameCtl');
const competitionCtl = require('../controllers/CompetitionCtl');

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

//Equipo
router.post("/team", teamCtl.create);
router.put("/team", teamCtl.update);
router.get("/team",teamCtl.findAll);
router.delete("/team/", teamCtl.delete);

//Partido
router.post("/soccer-game", soccerGameCtl.create);
router.put("/soccer-game", soccerGameCtl.update);
router.get("/soccer-game",soccerGameCtl.findAll);
router.delete("/soccer-game/", soccerGameCtl.delete);

//Competencia
router.post("/competition", competitionCtl.create);
router.put("/competition", competitionCtl.update);
router.get("/competition",competitionCtl.findAll);
router.delete("/competition/", competitionCtl.delete);

module.exports = router;