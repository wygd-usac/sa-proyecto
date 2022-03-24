const Competition = require("../models/CompetitionModel");

exports.create = (req, res) => {
    if (!req.body) {
      res.status(400).send({
        status: 500,
        message: "Error al crear competencia, los campos no pueden estar en blanco",
        data: []
      });
    }
  
    const competition = new Competition({
        name : req.body.name,
        champion_team : req.body.champion_team,
        type : req.body.type,
        year : req.body.year,
        country: req.body.country
    });
  
    //Crear Estadio
    Competition.create(competition, (err, data) => {
      if (err)
        res.status(500).send({
          status: 500,
          message:
              "Error al crear la competencia",
          data: []
        });
      else res.send(
          {
            status: 200,
            message:
                "Competencia creada con éxito",
            data: data
          });
    });

};

exports.update = (req, res) => {
    if (!req.body) {
      res.status(400).send({
        status: 500,
        message:
            "Error al actualizar la competencia",
        data: []
      });
    }
  
    console.log(req.body);
  
    Competition.updateById(
      req.body.id,
      new Competition(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "el id especificado no existe") {
            res.status(404).send({
                status: 500,
                message:
                    "Error al actualizar la competencia",
                data: []
            });
          } else {
            res.status(500).send({
                status: 500,
                message:
                    "Error al actualizar la competencia",
                data: []
            });
          }
        } else res.send(
            {
                status: 200,
                message:
                    "competition updated successfully",
                data: data
            });
      }
);
};

exports.findAll = (req, res) => {
    var id =  req.query.id || '';
  
    Competition.getAll(id, (err, data) => {
      if (err)
        res.status(500).send({
          status: 500,
          message:
                  "Error al obtener la competencia",
          data: []
        });
      else res.send({
        status: 200,
          message:
              "Información de las competencias",
          data: data
      });
    });
};

exports.delete = (req, res) => {
    const id = req.query.id; 
    Competition.remove(id, (err, data) => {
      if (err) {
        if (err.kind === "competencia no encontrado") {
          res.status(404).send({
            status: 500,
            message:
                "Error al eliminar la competencia",
            data: []
          });
        } else {
          res.status(500).send({
                    status: 500,
                    message:
                        "Error al eliminar la competencia",
                    data: []
          });
        }
      } else res.send({ 
        status: 200,
        message:
            "Competencia eliminada",
        data: [data]
      });
    });
};





