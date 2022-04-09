const Bitacora = require("../models/BitacoraModel");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      status: 500,
      message: "Error al crear bitacora, los campos no pueden estar en blanco",
      data: [],
    });
  }

  const bitacora = new Bitacora({
    id_administrador: req.body.id_administrador,
    accion: req.body.accion,
    //fecha: req.body.fecha,
    is_error: req.body.is_error,
  });
  //console.log(persona);
  Bitacora.create(bitacora, (err, data) => {
    if (err)
      res.status(500).send({
        status: 500,
        message: "Error al crear bitacora",
        data: [],
      });
    else
      res.send({
        status: 200,
        message: "Bitacora creado con éxito",
        data: data,
      });
  });
};

exports.findAll = (req, res) => {
  var id = req.query.id || "";

  Bitacora.getAll(id, (err, data) => {
    if (err)
      res.status(500).send({
        status: 500,
        message: "Error al obtener bitacora",
        data: [],
      });
    else
      res.send({
        status: 200,
        message: "Información de bitacora",
        data: data,
      });
  });
};
