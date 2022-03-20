const Team = require("../models/TeamModel");

// Creacion de un nuevo equipo
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        status: 500,
        message: "Error al crear equipo, los campos no pueden estar en blanco",
        data: []
      });
    }
  
    // Crear estadio
    const team = new Team({
        name : req.body.name,
        fundation_date : req.body.fundation_date,
        id_country : req.body.id_country,
        photo : req.body.photo
    });
  
    //Crear Estadio
    Team.create(team, (err, data) => {
      if (err)
        res.status(500).send({
          status: 500,
          message:
              "Error al crear el equipo",
          data: []
        });
      else res.send(
          {
            status: 200,
            message:
                "Equipo creado con éxito",
            data: data
          });
    });

};

exports.update = (req, res) => {
    if (!req.body) {
      res.status(400).send({
        status: 500,
        message:
            "Error al crear el equipo",
        data: []
      });
    }
  
    console.log(req.body);
  
    Team.updateById(
      req.body.id,
      new Team(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "el id especificado no existe") {
            res.status(404).send({
                status: 500,
                message:
                    "Error al actualizar equipo",
                data: []
            });
          } else {
            res.status(500).send({
                status: 500,
                message:
                    "Error al actualizar equipo",
                data: []
            });
          }
        } else res.send(
            {
                status: 200,
                message:
                    "Equipo actualizado",
                data: data
            });
      }
);
};

exports.findAll = (req, res) => {
    var id =  req.query.id || '';
  
    Team.getAll(id, (err, data) => {
      if (err)
        res.status(500).send({
          status: 500,
          message:
                  "Error al obtener equipo",
          data: []
        });
      else res.send({
        status: 200,
          message:
              "Información de los equipos",
          data: data
      });
    });
};

exports.delete = (req, res) => {
    const id = req.query.id; 
    Team.remove(id, (err, data) => {
      if (err) {
        if (err.kind === "equipo no encontrado") {
          res.status(404).send({
            status: 500,
            message:
                "Error al eliminar el equipo",
            data: []
          });
        } else {
          res.status(500).send({
                    status: 500,
                    message:
                        "Error al eliminar el equipo",
                    data: []
          });
        }
      } else res.send({ 
        status: 200,
        message:
            "Equipoo eliminado",
        data: [data]
      });
    });
};





