const Soccer_Game = require("../models/Soccer_GameModel");

exports.create = (req, res) => {
    if (!req.body) {
      res.status(400).send({
        status: 500,
        message: "Error al crear partido, los campos no pueden estar en blanco",
        data: []
      });
    }
  
    const soccer_game = new Soccer_Game({
        game_date: req.body.game_date,
        attendees: req.body.attendees,
        result_local: req.body.result_local,
        result_visiting: req.body.result_visiting,
        state: req.body.state,
        id_stadium: req.body.id_stadium,
        id_team_local: req.body.id_team_local,
        id_team_visiting: req.body.id_team_visiting,
        incidents: req.body.incidents || 0 
    });
  
    Soccer_Game.create(soccer_game, (err, data) => {
      if (err)
        res.status(500).send({
          status: 500,
          message:
              "Error al crear el partido",
          data: []
        });
      else res.send(
          {
            status: 200,
            message:
                "Partido creado con éxito",
            data: data
          });
    });
};

exports.update = (req, res) => {
    if (!req.body) {
      res.status(400).send({
        status: 500,
        message:
            "Error al actualizar partido",
        data: []
      });
    }
  
    console.log(req.body);
  
    Soccer_Game.updateById(
      req.body.id,
      new Soccer_Game(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "el id especificado no existe") {
            res.status(404).send({
                status: 500,
                message:
                    "Error al actualizar el partido",
                data: []
            });
          } else {
            res.status(500).send({
                status: 500,
                message:
                    "Error al actualizar el partido",
                data: []
            });
          }
        } else res.send(
            {
                status: 200,
                message:
                    "Partido actualizado con éxito",
                data: data
            });
      }
);
};

exports.delete = (req, res) => {
    const id = req.query.id; 
    Soccer_Game.remove(id, (err, data) => {
      if (err) {
        if (err.kind === "partido no encontrado") {
          res.status(404).send({
            status: 500,
            message:
                "Error al eliminar el partido",
            data: []
          });
        } else {
          res.status(500).send({
                    status: 500,
                    message:
                        "Error al eliminar el partido",
                    data: []
          });
        }
      } else res.send({ 
        status: 200,
        message:
            "Partido eliminado con éxito",
        data: [data]
      });
    });
};

exports.findAll = (req, res) => {
    var id =  req.query.id || '';
  
    Soccer_Game.getAll(id, (err, data) => {
      if (err)
        res.status(500).send({
          status: 500,
          message:
                  "Error al obtener partido",
          data: []
        });
      else res.send({
        status: 200,
          message:
              "Información de partidos",
          data: data
      });
    });
  };


