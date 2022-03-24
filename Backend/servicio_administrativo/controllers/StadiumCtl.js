const Stadium = require("../models/StadiumModel");

// Creacion de un nuevo estadio
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        status: 500,
        message: "Error al crear estadio, los campos no pueden estar en blanco",
        data: []
      });
    }
  
    // Crear estadio
    const stadium = new Stadium({
        name : req.body.name,
        fundation_date : req.body.fundation_date,
        capacity : req.body.capacity,
        id_country : req.body.id_country,
        address : req.body.address,
        state : req.body.state,
        photo : req.body.photo
    });
  
    //Crear Estadio
    Stadium.create(stadium, (err, data) => {
      if (err)
        res.status(500).send({
          status: 500,
          message:
              "Error al crear el estadio",
          data: []
        });
      else res.send(
          {
            status: 200,
            message:
                "Estadio creado con éxito",
            data: data
          });
    });

};

// Actualizar Estadio
exports.update = (req, res) => {
        if (!req.body) {
          res.status(400).send({
            status: 500,
            message:
                "Error al crear el estadio",
            data: []
          });
        }
      
        console.log(req.body);
      
        Stadium.updateById(
          req.body.id,
          new Stadium(req.body),
          (err, data) => {
            if (err) {
              if (err.kind === "el id especificado no existe") {
                res.status(404).send({
                    status: 500,
                    message:
                        "Error al actualizar el estadio",
                    data: []
                });
              } else {
                res.status(500).send({
                    status: 500,
                    message:
                        "Error al actualizar el estadio",
                    data: []
                });
              }
            } else res.send(
                {
                    status: 200,
                    message:
                        "Estadio actualizado con éxito",
                    data: data
                });
          }
    );
};

// Eliminar Estadio
exports.delete = (req, res) => {
    const id = req.query.id; 
    Stadium.remove(id, (err, data) => {
      if (err) {
        if (err.kind === "estadio no encontrado") {
          res.status(404).send({
            status: 500,
            message:
                "Error al actualizar el estadio",
            data: []
          });
        } else {
          res.status(500).send({
                    status: 500,
                    message:
                        "Error al actualizar el estadio",
                    data: []
          });
        }
      } else res.send({ 
        status: 200,
        message:
            "Estadio eliminado con éxito",
        data: [data]
      });
    });
};

exports.findAll = (req, res) => {
  var id =  req.query.id || '';

  Stadium.getAll(id, (err, data) => {
    if (err)
      res.status(500).send({
        status: 500,
        message:
                "Error al obtener estadio",
        data: []
      });
    else res.send({
      status: 200,
        message:
            "Información de estadios",
        data: data
    });
  });
};


