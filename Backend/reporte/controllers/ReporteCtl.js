const Reporte = require("../models/ReporteModel");

exports.suscribe = (req, res) => {
  var id = req.query.id || "";

  Reporte.suscribeByTeam(id, (err, data) => {
    if (err)
      res.status(500).send({
        status: 500,
        message: "Error al obtener el reporte",
        data: [],
      });
    else
      res.send({
        status: 200,
        message: "Información de reporte: Suscripciones por equipo",
        data: data,
      });
  });
};
