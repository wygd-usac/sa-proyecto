const Router = require('express');
const router = Router();
const dataOp = require('../data/dataOp');
const axios = require("axios");
//middleware para validar rutas y permisos
const {validate_session,validate_premium,alive} = require('../middleware/validations');
const {response} = require("express");


//-----------------------------------------------------
//-----------------------------------------------------
//-----------------------------------------------------
//-----------------------------------------------------

router.delete('/',(req,res)=>{
    axios.post('http://usuario:5000'+'/esb/usuario/update', {id_user: req.body.id, password:"desactivado"}).then(function (x) {
        try{
            res.send(
                {
                    status: 200,
                    msg: "Usuario eliminado con éxito.",
                    data: []
                }
            )
        }catch (e) {
            res.send(
                {
                    status: 400,
                    msg: "Error al eliminar el usuario.",
                    data: []
                }
            )
        }
    }).catch((error) => {
        res.status(200).json(
            {
                status: 400,
                msg: "Error al actualizar usuario",
                data: []
            }
        );
        console.log(error);
    })
})

router.get('/',(req,res)=>{

    axios.get('http://usuario:5000'+'/esb/usuario/get' + '?id=' + req.query.id ).then(function (x) {
        try{
            res.send(
                {
                    status: 200,
                    msg: "usuario obtenido",
                    data:[{
                        //token: x.data[0].token,
                        //id_status: 1,
                        //id_rol: x.data[0].id_rol,
                        //id_user: x.data[0].id_user,
                        //has_membership: x.data[0].membership

                        name: x.data[0].name,
                        lastname: "generico",
                        email: x.data[0].email,
                        phone: x.data[0].phone,
                        photo: x.data[0].photo,
                        gender: "F",
                        birth_date: "2022-01-01",
                        address: x.data[0].address,
                        age: x.data[0].age,
                        id_country: 1,
                        country: "Guatemala"

                    }]
                }
            )
        }catch (e) {
            res.send(
                {
                    status: 400,
                    msg: "Error de autenticación.",
                    data: []
                }
            )
        }
    }).catch((error) => {
        res.status(200).json(
            {
                status: 400,
                msg: "Error de autenticación.",
                data: []
            }
        );
        console.log(error);
    })

});



//pesonage
router.post('/membership',validate_session,async (req,res) => {
    const {id_client} = req.body;
    if(id_client == undefined){
        res.status(400).send( dataOp.getResponse(400,"Error al comprar membresía.",[]));
    }
    const result = await dataOp.obtainMembership(id_client);
    res.status(result.status).send(JSON.stringify(result));
});


router.put('/membership',validate_session,async (req,res) => {
    const {id_client} = req.body;
    if(id_client == undefined){
        res.status(400).send( dataOp.getResponse(400,"Error al cancelar membresía.",[]));
    }
    const result = await dataOp.cancelMembership(id_client);
    res.status(result.status).send(JSON.stringify(result));
});

router.post('/send-reset-email',validate_session,async (req,res) => {
    const {id_client} = req.body;
    if(id_client == undefined){
        res.send(dataOp.getResponse(400,"Error al reestablecer la clave.",[]));
    }
    /*
    
    
    */

    const result = dataOp.getResponse(200,"Se ha enviado un correo para reestablecer la clave.");
    res.send(JSON.stringify(result));
});

router.post('/reset',validate_session,async (req,res) => {
    const {id_client,new_pass} = req.body;
    if(id_client == undefined || new_pass == undefined){
        res.send(dataOp.getResponse(400,"Error al reestablecer la clave."));
    }
    /*
    
    
    */

    const result =  dataOp.getResponse(200,"Se ha enviado un correo para reestablecer la clave.");
    res.send(JSON.stringify(result));
});
//http://localhost:4200/#/forms/clienteteam
router.post('/follow',validate_session,async (req,res) => {
    const {id_client,id_team} = req.body;
    if(id_client == undefined || id_team == undefined){
        res.send(dataOp.getResponse(400,"Error al seguir un equipo."));
    }
    console.log(id_client);
    console.log(id_team);
    const result = await dataOp.followTeam(id_client,id_team);
    console.log(result);
    if(result.status != 400)
        res.status(200).send(JSON.stringify(result));
    else
    res.status(400).send(dataOp.getResponse(400,"Error al seguir un equipo."));
});
//http://localhost:4200/#/forms/clienteteam
router.get('/notifications',validate_session, async (req,res) => {
    const {id} = req.query;
    if(id == undefined){
        res.send(dataOp.getResponse(400,"Error al retornar el reporte",[]));
    }


    const result = await dataOp.getNotifications(id);
    res.send(result);
});

//http://localhost:4200/#/forms/personage
router.post('/quiniela',validate_session,async (req,res) => {
    const {id_client,id_game,result_1,result_2} = req.body;
    if(id_client == undefined || id_game == undefined || result_1 == undefined || result_2 == undefined){
        res.send(dataOp.getResponse(400,"Error al actualizar el estado de la quiniela."));
    }
    const result = await dataOp.setQuinielaResult(id_game,id_client,result_1,result_2);
    res.send(result);
});

//------------------------------delete team /esb/team/delete/:id
//http://localhost:4200/#/forms/clienteteam
router.get('/report/1/',validate_session,async (req,res)=>{
    const {id_team,player} = req.query;
    if(id_team == undefined || player == undefined){
        res.status(400).send(dataOp.getResponse(400,"Error al obtener los jugadores o técnico del equipo.",[]));
    }

    const result = await dataOp.getTeamPersons(id_team,player);
    res.status(200).send(result);
});



//http://localhost:4200/#/forms/personage
router.get('/report/2/',validate_session,async (req,res) => {
    const {age,player} = req.query;
    if(age == undefined || player==undefined){
        res.send(dataOp.getResponse(400,"Error al retornar el reporte",[]));
    }
    //console.log(req.query);

    const result = await dataOp.getPersonsHigher(age,player);
    res.status(result.status).send(result);
});


//http://localhost:4200/#/forms/personage
router.get('/report/3/',validate_session,async (req,res) => {
    const {age,player} = req.query;
    if(player == undefined || player == undefined){
        res.status(400).send(dataOp.getResponse(400,"Error al obtener los jugadores o técnicos menores a x años.",[]));
    }


    const result = await dataOp.getPersonsLower(age,player);
    res.status(200).send(result);
});


//http://localhost:4200/#/forms/clienteteam
router.get('/report/4/',validate_session,async (req,res) => {
    const {id_competition} = req.query;
    if(id_competition == undefined){
        res.send(dataOp.getResponse(400,"Error al obtener los equipos que participaron en una competición.",[]));
    }


    const result = await dataOp.getCompetitionTeams(id_competition);
    res.status(200).send(result);
});


//http://localhost:4200/#/forms/clienteteam
router.get('/report/5/',validate_session,async (req,res) => {
    const {id_country} = req.query;
    if(id_country == undefined){
        res.status(400).send(dataOp.getResponse(400,"Error al obtener los equipos de un país.",[]));
    }


    const result = await dataOp.getCountryTeams(id_country);
    res.status(200).send(result);
});

//## Equipos segun antiguage
//http://localhost:4200/#/forms/clienteteam
router.get('/report/6/',validate_session,async (req,res) => {
    const {age} = req.query;
    if(age == undefined){
        res.status(400).send(dataOp.getResponse(400,"Error al obtener los equipos con x años de antigüedad.",[]));
    }

    const result = await dataOp.getTeamsByAge(age);
    res.status(200).send(result);
});

//## Estadios en X país
//http://localhost:4200/#/forms/clienteteam
router.get('/report/7/',validate_session,async (req,res) => {
    const {id_country} = req.query;
    if(id_country == undefined){
        res.send(dataOp.getResponse(400,"Error al obtener los estadios de un país.",[]));
    }

    const result = await dataOp.getCountryStadiums(id_country);
    res.send(result);
});

//## Estadios con capacity menor o igual a X
//http://localhost:4200/#/forms/clienteteam
router.get('/report/8/',validate_session,async (req,res) => {
    const {capacity} = req.query;
    if(capacity == undefined){
        res.send(dataOp.getResponse(400,"Error al obtener los estadios con capacidad menor o igual a x.",[]));
    }

    const result = await dataOp.getStadiumsByCapacity(capacity);
    res.send(result);
});





//http://localhost:4200/#/forms/personage
//## Histórico de partidos de X equipo
router.get('/report/9/',validate_session,async (req,res) => {
    const {id_team} = req.query;
    if(id_team == undefined){
        res.send(dataOp.getResponse(400,"Error al obtener el histórico de partidos del equipo x.",[]));
    }

    const result = await dataOp.getTeamHistory(id_team);
    res.send(result);
});

//http://localhost:4200/#/forms/personage
//## Equipos en los que ha estado o dirigido X técnico o jugador
router.get('/report/10/',validate_session,async (req,res) => {
    const {id,player} = req.query;
    if(id == undefined){
        res.send(dataOp.getResponse(400,"Error al obtener los equipos en los que ha estado o dirigido x.",[]));
    }
    const result = await dataOp.getHistoryPTeams(id,player);
    res.send(result);
});

//http://localhost:4200/#/forms/clienteteam
//## Partidos donde hubo al menos X goles
router.get('/reports/game/goal/',validate_session,async (req,res) => {
    const {goals} = req.query;
    if(goals == undefined){
        res.send(dataOp.getResponse(400,"Error al retornar el reporte",[]));
    }
    console.log(req.query);
    const result = await dataOp.getGamesWithGoals(goals);
    res.send(result);
});

//http://localhost:4200/#/forms/personage
//## Jugadores con más X incidencias en Y competición, (de Z año)
router.get('/report//',validate_session,async (req,res) => {
    const {competicion,anio} = req.query;
    if(competicion == undefined || anio == undefined){
        res.send(dataOp.getResponse(400,"Error al retornar el reporte",[]));
    }
    console.log(req.query);

    const result = await dataOp.getIncidentsCompetitionYear(competicion,anio);
    res.send(result);
});

//http://localhost:4200/#/forms/personage
//## Cantidad de X competiciones que ha ganado Y equipo
router.get('/reports/team/competitions',validate_session,async (req,res) => {
    const {equipo} = req.query;
    if(equipo == undefined){
        res.status(400).send(dataOp.getResponse(400,"Error al retornar el reporte",[]));
    }
    console.log(req.query);

    const result = await dataOp.getTotalCompetitionsWinning(equipo);
    res.status(200).send(result);
});

//http://localhost:4200/#/forms/clienteteam
//## Listado de partidos en X año
router.get('/reports/games/year',validate_session,async (req,res) => {
    const {anio} = req.query;
    if(anio == undefined){
        res.send(dataOp.getResponse(400,"Error al retornar el reporte",[]));
    }
    console.log(req.query);

    const result = await dataOp.getGamesByYear(anio);
    res.send(result);
});


//http://localhost:4200/#/forms/clienteteam
//## Listado de partidos entre X equipo contra Y equipo
router.get('/reports/games/teams',validate_session,async (req,res) => {
    const {local,visitante} = req.query;
    if(local == undefined || visitante == undefined){
        res.send(dataOp.getResponse(400,"Error al retornar el reporte",[]));
    }
    console.log(req.query);

    const result = await dataOp.getBetweenXY(local,visitante);
    res.send(result);
});
//-----------------------------------------------------
//-----------------------------------------------------
//-----------------------------------------------------
//-----------------------------------------------------
router.get('/listar',validate_session, (req, res) => {
    res.send("Modulo de Cliente");
});

router.get('/countries',validate_session,async (req,res) => {
    const countries = await dataOp.getCountries();
    //console.log(countries);
    res.send({'countries':countries});
});






module.exports = router;
