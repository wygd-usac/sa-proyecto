const Transfer = require("../models/TransferModel");

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        status: 500,
        message: "Error al actualizar transferencia, los campos no pueden estar en blanco",
        data: []
      });
    }
  
    const transfer = new Transfer({
        first_date : req.first_date || new Date(),
        Last_date : req.Last_date || new Date(),
        Person_id : req.Person_id,
        team_origin : req.team_origin,
        team_destination : req.team_destination,
        id_user : req.id_user 
    });

    Transfer.create(transfer, (err, data) => {
      if (err)
        res.status(500).send({
          status: 500,
          message:
              "Error al crear la transferencia",
          data: []
        });
      else res.send(
          {
            status: 200,
            message:
                "Transferencia realizada con éxito",
            data: data
          });
    });

};


exports.findAll = (req, res) => {;
  
    Transfer.getAll((err, data) => {
      if (err)
        res.status(500).send({
          status: 500,
          message:
                  "Error al obtener transferencia",
          data: []
        });
      else res.send({
        status: 200,
          message:
              "Información de transferencias",
          data: data
      });
    });
};